import { database } from '@/services/LocalDatabase'
import { type Ref, ref, onMounted } from 'vue'
import { type DBTable, LogLevel } from '@/constants/enums'
import { useLogger } from './useLogger'

interface useTableParams {
  table: DBTable
  tableColumns: any[]
  columnOptions: any[]
  visibleColumns: string[]
}

const { log } = useLogger()

export function useTable({ table, tableColumns, columnOptions, visibleColumns }: useTableParams) {
  const tableVisibleColumns: Ref<string[]> = ref(visibleColumns)
  const tableColumnOptions: Ref<any[]> = ref(columnOptions)
  const tableRows: Ref<any[]> = ref([])
  const rowDetails: Ref<any | undefined> = ref(undefined)
  const selectedRowId: Ref<string> = ref('')

  const createDialog: Ref<boolean> = ref(false)
  const clearDialog: Ref<boolean> = ref(false)
  const reportDialog: Ref<boolean> = ref(false)
  const detailsDialog: Ref<boolean> = ref(false)
  const editDialog: Ref<boolean> = ref(false)
  const deleteDialog: Ref<boolean> = ref(false)

  onMounted(async () => {
    updateTableRows()
  })

  async function updateTableRows(): Promise<void> {
    try {
      tableRows.value = await database.getAll(table)
    } catch (error) {
      log({ error, level: LogLevel.ERROR, name: 'updateTableRows', details: table })
    }
  }

  //
  // Create
  //

  function openCreateDialog(): void {
    createDialog.value = true
  }

  function saveCreateDialog(): void {
    createDialog.value = false
  }

  //
  // Clear
  //

  function openClearDialog(): void {
    clearDialog.value = true
  }

  async function confirmClearDialog(): Promise<void> {
    try {
      await database.clear(table)
      updateTableRows()
    } catch (error) {
      log({ error, level: LogLevel.ERROR, name: 'confirmClearDialog', details: table })
    } finally {
      clearDialog.value = false
    }
  }

  //
  // Report
  //

  function openReportDialog(id: string): void {
    selectedRowId.value = id
    reportDialog.value = true
  }

  //
  // Details
  //

  async function openDetailsDialog(id: string): Promise<void> {
    try {
      rowDetails.value = await database.getById(table, id)
      detailsDialog.value = true
    } catch (error) {
      log({
        error,
        level: LogLevel.ERROR,
        name: 'openDetailsDialog',
        details: `${table}:${id}`,
      })
    }
  }

  //
  // Edit
  //

  function openEditDialog(id: string): void {
    selectedRowId.value = id
    editDialog.value = true
  }

  function saveEditDialog(): void {
    editDialog.value = false
  }

  //
  // Delete
  //

  function openDeleteDialog(id: string): void {
    selectedRowId.value = id
    deleteDialog.value = true
  }

  async function confirmDeleteDialog(): Promise<void> {
    const id = selectedRowId.value

    try {
      await database.deleteById(table, id)
      updateTableRows()
    } catch (error) {
      log({
        error,
        level: LogLevel.ERROR,
        name: 'confirmDeleteDialog',
        details: `${table}:${id}`,
      })
    } finally {
      deleteDialog.value = false
    }
  }

  return {
    tableVisibleColumns,
    tableColumnOptions,
    tableColumns,
    tableRows,
    rowDetails,
    selectedRowId,
    createDialog,
    clearDialog,
    reportDialog,
    detailsDialog,
    editDialog,
    deleteDialog,
    openCreateDialog,
    saveCreateDialog,
    openClearDialog,
    confirmClearDialog,
    openReportDialog,
    openDetailsDialog,
    openEditDialog,
    saveEditDialog,
    openDeleteDialog,
    confirmDeleteDialog,
  }
}
