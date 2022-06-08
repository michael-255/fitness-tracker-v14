import { database } from '@/services/LocalDatabase'
import { Store } from '@/constants'
import { logger } from '@/services/Logger'
import { ref, onMounted } from 'vue'
import type { IMeasurement } from '@/models/Measurement'
import type { Ref } from 'vue'

export function useMeasurements() {
  const tableRows: Ref<IMeasurement[]> = ref([])
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
  ]

  onMounted(async () => {
    updateTableRows()
  })

  async function clearMeasurementsTableData() {
    try {
      if (confirm(`Clear "${Store.MEASUREMENTS}" table data?`)) {
        await database.clear(Store.MEASUREMENTS)
        updateTableRows()
      }
    } catch (err) {
      logger.error(err)
      database.addAppLog(err, new Error('clearMeasurementsTableData'))
    }
  }

  async function deleteMeasurementRow(id: string) {
    try {
      if (confirm(`Delete Measurement "${id}" from database?`)) {
        await database.deleteById(Store.MEASUREMENTS, id)
        updateTableRows()
      }
    } catch (err) {
      logger.error(err)
      database.addAppLog(err, new Error('deleteMeasurementRow'))
    }
  }

  async function getMeasurementDetails(id: string) {
    try {
      details.value = await database.getById(Store.MEASUREMENTS, id)
      dialog.value = true
    } catch (err) {
      logger.error(err)
      database.addAppLog(err, new Error('getMeasurementDetails'))
    }
  }

  async function updateTableRows() {
    tableRows.value = await database.getAll(Store.MEASUREMENTS)
  }

  return {
    tableRows,
    tableColumns,
    dialog,
    details,
    clearMeasurementsTableData,
    deleteMeasurementRow,
    getMeasurementDetails,
  }
}
