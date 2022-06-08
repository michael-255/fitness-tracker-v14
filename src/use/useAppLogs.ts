import { Store } from '@/constants'
import { useTableUtils } from '@/use/useTableUtils'
import { ref, onMounted } from 'vue'
import type { IAppLog } from '@/models/AppLog'
import type { Ref } from 'vue'

export function useAppLogs() {
  const { updateTableRows, deleteTableRow, clearTableData, openRowDetails } = useTableUtils()

  const tableRows: Ref<IAppLog[]> = ref([])
  const rowDetails: Ref<any> = ref(null)
  const dialog: Ref<boolean> = ref(false)

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
    updateTableRows(Store.APP_LOGS, tableRows)
  })

  async function clearAppLogsTableData(): Promise<void> {
    await clearTableData(Store.APP_LOGS, tableRows)
  }

  async function deleteAppLogRow(id: string): Promise<void> {
    await deleteTableRow(Store.APP_LOGS, tableRows, id)
  }

  async function getAppLogDetails(id: string): Promise<void> {
    await openRowDetails(Store.APP_LOGS, rowDetails, dialog, id)
  }

  return {
    tableColumns,
    tableRows,
    rowDetails,
    dialog,
    clearAppLogsTableData,
    deleteAppLogRow,
    getAppLogDetails,
  }
}
