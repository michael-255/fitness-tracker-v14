import { database } from '@/services/LocalDatabase'
import { logger } from '@/services/Logger'
import type { Store } from '@/constants'
import type { Ref } from 'vue'

export function useTableUtils() {
  async function updateTableRows(store: Store, tableRows: Ref<any[]>): Promise<void> {
    tableRows.value = await database.getAll(store)
  }

  async function deleteTableRow(store: Store, tableRows: Ref<any[]>, id: string): Promise<void> {
    try {
      if (confirm(`Delete "${id}" from "${store}" table?`)) {
        await database.deleteById(store, id)
        updateTableRows(store, tableRows)
      }
    } catch (err) {
      logger.error(err)
      database.addAppLog(err, new Error(`deleteTableRow:${store}:${id}`))
    }
  }

  async function clearTableData(store: Store, tableRows: Ref<any[]>): Promise<void> {
    try {
      if (confirm(`Clear "${store}" table data?`)) {
        await database.clear(store)
        updateTableRows(store, tableRows)
      }
    } catch (err) {
      logger.error(err)
      database.addAppLog(err, new Error(`clearTableData:${store}`))
    }
  }

  async function openRowDetails(
    store: Store,
    rowDetails: Ref<any>,
    dialog: Ref<boolean>,
    id: string
  ): Promise<void> {
    try {
      throw Error('TEST')
      rowDetails.value = await database.getById(store, id)
      dialog.value = true
    } catch (err) {
      logger.error(err)
      database.addAppLog(err, new Error(`openRowDetails:${store}:${id}`))
    }
  }

  return {
    updateTableRows,
    deleteTableRow,
    clearTableData,
    openRowDetails,
  }
}
