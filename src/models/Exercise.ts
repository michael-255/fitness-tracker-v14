import type { TrackBoolean } from '@/constants/types'
import type { ExerciseObject } from '@/constants/interfaces'
import { _Activity } from '@/models/_Activity'

/**
 * Exercise Class
 * @param obj ExerciseObject
 */
export class Exercise extends _Activity {
  protected trackMultipleSets: TrackBoolean
  protected trackDuration: TrackBoolean
  protected trackDistance: TrackBoolean
  protected trackWeight: TrackBoolean
  protected trackReps: TrackBoolean

  constructor({
    id,
    createdAt,
    name = 'My Exercise',
    description,
    trackMultipleSets = false,
    trackDuration = false,
    trackDistance = false,
    trackWeight = false,
    trackReps = false,
  }: ExerciseObject = {}) {
    super({ id, createdAt, name, description })
    this.trackMultipleSets = trackMultipleSets
    this.trackDuration = trackDuration
    this.trackDistance = trackDistance
    this.trackWeight = trackWeight
    this.trackReps = trackReps
  }
}
