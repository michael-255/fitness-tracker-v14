import { DBTable } from '@/constants/enums'
import type { Id, CreatedAt, ActivityName, TextBlock, TrackBoolean } from '@/constants/types'
import type { Exercise } from '@/models/Exercise'
import { database } from '@/services/LocalDatabase'
import { type Ref, ref, onMounted } from 'vue'
import { useAppLogger } from './useAppLogger'
import { LogLevel } from '@/constants/enums'

const { silentLog } = useAppLogger()

export function useExerciseProps(exerciseId?: Id): any {
  const e_id: Ref<Id> = ref('')
  const e_createdAt: Ref<CreatedAt> = ref('')
  const e_name: Ref<ActivityName> = ref('My Exercise')
  const e_description: Ref<TextBlock> = ref(null)
  const e_trackMultipleSets: Ref<TrackBoolean> = ref(false)
  const e_trackDuration: Ref<TrackBoolean> = ref(false)
  const e_trackDistance: Ref<TrackBoolean> = ref(false)
  const e_trackWeight: Ref<TrackBoolean> = ref(false)
  const e_trackReps: Ref<TrackBoolean> = ref(false)

  onMounted(async () => {
    if (exerciseId) {
      await setExerciseRefs(exerciseId)
    }
  })

  async function setExerciseRefs(exerciseId: Id) {
    const exercise = await database.getById<Exercise>(DBTable.EXERCISES, exerciseId)

    if (exercise) {
      e_id.value = exercise.id
      e_createdAt.value = exercise.createdAt
      e_name.value = exercise.name
      e_description.value = exercise.description
      e_trackMultipleSets.value = exercise.trackMultipleSets
      e_trackDuration.value = exercise.trackDuration
      e_trackDistance.value = exercise.trackDistance
      e_trackWeight.value = exercise.trackWeight
      e_trackReps.value = exercise.trackReps
    } else {
      silentLog({
        error: new Error(),
        level: LogLevel.ERROR,
        name: 'setIdRef',
        details: exerciseId,
      })
    }
  }

  return {
    e_id,
    e_createdAt,
    e_name,
    e_description,
    e_trackMultipleSets,
    e_trackDuration,
    e_trackDistance,
    e_trackWeight,
    e_trackReps,
    setExerciseRefs,
  }
}
