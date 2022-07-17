import {
  DialogType,
  Icon,
  DBTable,
  LogLevel,
  ActivityStatus,
  MeasurementType,
} from '@/constants/enums'
import { type Ref, ref, onMounted } from 'vue'
import { database } from '@/services/LocalDatabase'
import { useMessaging } from '@/use/useMessaging'
import { useTable } from '@/use/useTable'
import { Measurement } from '@/models/Measurement'
import { useMeasurementInputs } from '@/use/useMeasurementInputs'

export function useTabContent(table: DBTable) {
  const { setMeasurement, getMeasurement, isMeasurementValid } = useMeasurementInputs()
  const { log, notify, confirmDialog } = useMessaging()
  const { getTableLabel } = useTable()

  const tableRows: Ref<any[]> = ref([])
  const dialog: Ref<boolean> = ref(false)
  const dialogType: Ref<DialogType> = ref(DialogType.DETAILS)
  const detailsItem: Ref<any> = ref({})

  onMounted(async () => {
    await updateTableRows()
  })

  async function updateTableRows(): Promise<void> {
    try {
      tableRows.value = await database.getAll(table)
    } catch (error) {
      const callerName = 'updateTableRows'
      log({ error, level: LogLevel.ERROR, callerName })
      notify(`Error with operation: ${callerName}`, Icon.ERROR, 'negative')
    }
  }

  async function updateDialog(event: any): Promise<void> {
    await updateTableRows()
    dialog.value = !!event
  }

  function validationFailed(): void {
    notify('Must correct form validation errors to save', Icon.WARN, 'orange-9')
  }

  const onBehavior: { [x: string]: any } = {
    [DBTable.MEASUREMENTS]: {
      [DialogType.CREATE]: {
        open: () => setMeasurement('', '', '', '', ActivityStatus.ENABLED, MeasurementType.INCHES),
        save: async () => {
          if (isMeasurementValid()) {
            const m = getMeasurement()
            await database.add<Measurement>(
              table,
              new Measurement({
                id: m?.id,
                createdAt: m?.createdAt,
                name: m?.name,
                description: m?.description,
                activityStatus: m?.activityStatus,
                measurementType: m?.measurementType,
              } as Measurement)
            )
            updateDialog(false)
          } else {
            validationFailed()
          }
        },
      },
      [DialogType.REPORT]: {
        open: (id: string) => console.log('measurement report:', id),
      },
      [DialogType.DETAILS]: {
        open: async (id: string) => {
          detailsItem.value = await database.getById<Measurement>(table, id)
        },
      },
      [DialogType.EDIT]: {
        open: async (id: string) => {
          const m = await database.getById<Measurement>(table, id)
          setMeasurement(
            m?.id,
            m?.createdAt,
            m?.name,
            m?.description,
            m?.activityStatus,
            m?.measurementType
          )
        },
        save: async () => {
          if (isMeasurementValid()) {
            const m = getMeasurement()
            await database.updateById<Measurement>(
              table,
              m?.id as string,
              new Measurement({
                id: m?.id,
                createdAt: m?.createdAt,
                name: m?.name,
                description: m?.description,
                activityStatus: m?.activityStatus,
                measurementType: m?.measurementType,
              } as Measurement)
            )
            updateDialog(false)
          } else {
            validationFailed()
          }
        },
      },
    },
    [DBTable.MEASUREMENT_RECORDS]: {
      [DialogType.CREATE]: () => console.log('measurement record create'),
      [DialogType.REPORT]: () => console.log('measurement record report'),
      [DialogType.DETAILS]: () => console.log('measurement record details'),
      [DialogType.EDIT]: () => console.log('measurement record edit'),
    },
  }

  function onCreate(): void {
    dialogType.value = DialogType.CREATE
    onBehavior[table][dialogType.value].open()
    dialog.value = true
  }

  async function onReport(id: string): Promise<void> {
    dialogType.value = DialogType.REPORT
    onBehavior[table][dialogType.value].open(id)
    dialog.value = true
  }

  async function onDetails(id: string): Promise<void> {
    dialogType.value = DialogType.DETAILS
    onBehavior[table][dialogType.value].open(id)
    dialog.value = true
  }

  async function onEdit(id: string): Promise<void> {
    dialogType.value = DialogType.EDIT
    onBehavior[table][dialogType.value].open(id)
    dialog.value = true
  }

  async function onDelete(id: string): Promise<void> {
    confirmDialog(
      'Delete',
      `Permanently delete item << ${id} >> from the ${getTableLabel(table)} table?`,
      async () => {
        try {
          await database.deleteById(table, id)
          await updateTableRows()
        } catch (error) {
          const callerName = 'onDelete'
          log({ error, level: LogLevel.ERROR, callerName })
          notify(`Error ${callerName}`, Icon.ERROR, 'negative')
        }
      }
    )
  }

  async function onClear(): Promise<void> {
    confirmDialog(
      'Clear',
      `Permanently delete all data from the ${getTableLabel(table)} table?`,
      async () => {
        try {
          await database.clear(table)
          await updateTableRows()
        } catch (error) {
          const callerName = 'onClear'
          log({ error, level: LogLevel.ERROR, callerName })
          notify(`Error ${callerName}`, Icon.ERROR, 'negative')
        }
      }
    )
  }

  async function onSaved(): Promise<void> {
    onBehavior[table][dialogType.value].save()
  }

  return {
    tableRows,
    dialog,
    dialogType,
    detailsItem,
    updateDialog,
    onCreate,
    onReport,
    onDetails,
    onEdit,
    onDelete,
    onClear,
    onSaved,
  }
}
