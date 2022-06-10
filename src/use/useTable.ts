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
  const dialog: Ref<boolean> = ref(false)

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

  async function clearTableData(): Promise<void> {
    try {
      if (confirm(`Clear "${store}" table data?`)) {
        await database.clear(store)
        updateTableRows()
      }
    } catch (error) {
      silentLog({ error, level: LogLevel.ERROR, name: 'clearTableData', details: store })
    }
  }

  async function deleteTableRow(id: string): Promise<void> {
    try {
      if (confirm(`Delete "${id}" from "${store}" table?`)) {
        await database.deleteById(store, id)
        updateTableRows()
      }
    } catch (error) {
      silentLog({ error, level: LogLevel.ERROR, name: 'deleteTableRow', details: `${store}:${id}` })
    }
  }

  async function openRowDetails(id: string): Promise<void> {
    try {
      rowDetails.value = await database.getById(store, id)
      dialog.value = true
    } catch (error) {
      silentLog({ error, level: LogLevel.ERROR, name: 'openRowDetails', details: `${store}:${id}` })
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
