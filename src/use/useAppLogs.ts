import { database } from '@/services/LocalDatabase'
import { Store } from '@/constants'
import { logger } from '@/services/Logger'
import { ref, onMounted } from 'vue'
import type { IAppLog } from '@/models/AppLog'
import type { Ref } from 'vue'

export function useAppLogs() {
  const tableRows: Ref<IAppLog[]> = ref([])
  const dialog: Ref<boolean> = ref(false)
  const details: Ref<any> = ref(null)

  const tableColumns: any[] = [
    {
      name: 'id',
      label: 'Id',
      align: 'left',
      required: true,
      field: (row: any) => row.id,
      sortable: true,
    },
    {
      name: 'createdAt',
      label: 'Created At',
      align: 'left',
      required: true,
      field: (row: any) => row.createdAt,
      sortable: true,
    },
    {
      name: 'message',
      label: 'First Message',
      align: 'left',
      required: true,
      field: (row: any) => row.message[0],
      sortable: true,
    },
    {
      name: 'message',
      label: 'Message Count',
      align: 'left',
      required: true,
      field: (row: any) => row.message.length,
      sortable: true,
    },
    {
      name: 'stack',
      label: 'Stack Count',
      align: 'left',
      required: true,
      field: (row: any) => row.stack.length,
      sortable: true,
    },
  ]

  onMounted(async () => {
    updateViewState()
  })

  async function clearAppLogsTableData() {
    try {
      if (confirm(`Clear "${Store.APP_LOGS}" table data?`)) {
        await database.clear(Store.APP_LOGS)
        updateViewState()
      }
    } catch (err) {
      logger.error(err)
      database.addAppLog(err, new Error('clearAppLogsTableData'))
    }
  }

  async function deleteAppLogRow(id: string) {
    try {
      if (confirm(`Delete App Log "${id}" from database?`)) {
        await database.deleteById(Store.APP_LOGS, id)
        updateViewState()
      }
    } catch (err) {
      logger.error(err)
      database.addAppLog(err, new Error('deleteAppLogRow'))
    }
  }

  async function getAppLogDetails(id: string) {
    try {
      details.value = await database.getById(Store.APP_LOGS, id)
      dialog.value = true
    } catch (err) {
      logger.error(err)
      database.addAppLog(err, new Error('getAppLogDetails'))
    }
  }

  async function updateViewState() {
    tableRows.value = await database.getAll(Store.APP_LOGS)
  }

  return {
    tableRows,
    tableColumns,
    dialog,
    details,
    clearAppLogsTableData,
    deleteAppLogRow,
    getAppLogDetails,
  }
}
