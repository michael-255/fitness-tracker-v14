import { database } from '@/services/LocalDatabase'
import { ref, onMounted } from 'vue'
import type { Store } from '@/constants'
import type { IEntity } from '@/models/_Entity'
import type { Ref } from 'vue'
import { useAppLogger } from './useAppLogger'
import { LogLevel } from '@/models/AppLog'

interface useTableParams {
  store: Store
  tableColumns: any[]
}

const { silentLog } = useAppLogger()

export function useTable({ store, tableColumns }: useTableParams) {
  const tableRows: Ref<IEntity[]> = ref([])
  const rowDetails: Ref<IEntity | undefined> = ref(undefined)
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
      tableRows.value = await database.getAll(store)
    } catch (error) {
      silentLog({ error, level: LogLevel.ERROR, name: 'updateTableRows', details: store })
    }
  }

  //
  // Create
  //

  function openCreateDialog() {
    createDialog.value = true
  }

  //
  // Clear
  //

  function openClearDialog() {
    clearDialog.value = true
  }

  async function confirmClearDialog() {
    try {
      await database.clear(store)
      updateTableRows()
    } catch (error) {
      silentLog({ error, level: LogLevel.ERROR, name: 'confirmClearDialog', details: store })
    } finally {
      clearDialog.value = false
    }
  }

  //
  // Report
  //

  function openReportDialog(id: string) {
    selectedRowId.value = id
    reportDialog.value = true
  }

  //
  // Details
  //

  async function openDetailsDialog(id: string) {
    try {
      rowDetails.value = await database.getById(store, id)
      detailsDialog.value = true
    } catch (error) {
      silentLog({
        error,
        level: LogLevel.ERROR,
        name: 'openDetailsDialog',
        details: `${store}:${id}`,
      })
    }
  }

  //
  // Edit
  //

  function openEditDialog(id: string) {
    selectedRowId.value = id
    editDialog.value = true
  }

  //
  // Delete
  //

  function openDeleteDialog(id: string) {
    selectedRowId.value = id
    deleteDialog.value = true
  }

  async function confirmDeleteDialog() {
    const id = selectedRowId.value

    try {
      await database.deleteById(store, id)
      updateTableRows()
    } catch (error) {
      silentLog({
        error,
        level: LogLevel.ERROR,
        name: 'confirmDeleteDialog',
        details: `${store}:${id}`,
      })
    } finally {
      deleteDialog.value = false
    }
  }

  return {
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
    openClearDialog,
    confirmClearDialog,
    openReportDialog,
    openDetailsDialog,
    openEditDialog,
    openDeleteDialog,
    confirmDeleteDialog,
  }
}
