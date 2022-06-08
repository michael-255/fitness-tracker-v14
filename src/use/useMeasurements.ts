import { Store } from '@/constants'
import { ref, onMounted } from 'vue'
import { useTableUtils } from '@/use/useTableUtils'
import type { IMeasurement } from '@/models/Measurement'
import type { Ref } from 'vue'

export function useMeasurements() {
  const { updateTableRows, deleteTableRow, clearTableData, openRowDetails } = useTableUtils()

  const tableRows: Ref<IMeasurement[]> = ref([])
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
  ]

  onMounted(async () => {
    updateTableRows(Store.MEASUREMENTS, tableRows)
  })

  async function clearMeasurementsTableData(): Promise<void> {
    await clearTableData(Store.MEASUREMENTS, tableRows)
  }

  async function deleteMeasurementRow(id: string): Promise<void> {
    await deleteTableRow(Store.MEASUREMENTS, tableRows, id)
  }

  async function getMeasurementDetails(id: string): Promise<void> {
    await openRowDetails(Store.MEASUREMENTS, rowDetails, dialog, id)
  }

  return {
    tableColumns,
    tableRows,
    rowDetails,
    dialog,
    clearMeasurementsTableData,
    deleteMeasurementRow,
    getMeasurementDetails,
  }
}
