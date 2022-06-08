import { database } from '@/services/LocalDatabase'
import { logger } from '@/services/Logger'
import { ref, onMounted } from 'vue'
import type { Store } from '@/constants'
import type { IEntity } from '@/models/_Entity'
import type { Ref } from 'vue'

interface useTableParams {
  store: Store
  tableColumns: any[]
}

export function useTable({ store, tableColumns }: useTableParams) {
  const tableRows: Ref<IEntity[]> = ref([])
  const rowDetails: Ref<IEntity | undefined> = ref(undefined)
  const dialog: Ref<boolean> = ref(false)

  onMounted(async () => {
    updateTableRows()
  })

  async function updateTableRows(): Promise<void> {
    try {
      tableRows.value = await database.getAll(store)
    } catch (err) {
      logger.error(err)
      database.addAppLog(err, new Error(`updateTableRows:${store}`))
    }
  }

  async function clearTableData(): Promise<void> {
    try {
      if (confirm(`Clear "${store}" table data?`)) {
        await database.clear(store)
        updateTableRows()
      }
    } catch (err) {
      logger.error(err)
      database.addAppLog(err, new Error(`clearTableData:${store}`))
    }
  }

  async function deleteTableRow(id: string): Promise<void> {
    try {
      if (confirm(`Delete "${id}" from "${store}" table?`)) {
        await database.deleteById(store, id)
        updateTableRows()
      }
    } catch (err) {
      logger.error(err)
      database.addAppLog(err, new Error(`deleteTableRow:${store}:${id}`))
    }
  }

  async function openRowDetails(id: string): Promise<void> {
    try {
      rowDetails.value = await database.getById(store, id)
      dialog.value = true
    } catch (err) {
      logger.error(err)
      database.addAppLog(err, new Error(`openRowDetails:${store}:${id}`))
    }
  }

  return {
    tableColumns,
    tableRows,
    rowDetails,
    dialog,
    clearTableData,
    deleteTableRow,
    openRowDetails,
  }
}
