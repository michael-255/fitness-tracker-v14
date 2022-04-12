import { _Action } from './_Action'

export interface ExerciseElements {
  hasConfirm?: boolean
  hasSets?: boolean
  hasDuration?: boolean
  hasDistance?: boolean
  hasWeight?: boolean
  hasReps?: boolean
}

// Exports for LocalDatabase
export const ExerciseStore = Object.freeze({ exercises: '&id, name' })
export interface IExercise {
  id: string
  createdAt: string
  name: string
  description: string
  elements: object
}

type ExerciseParams = {
  id?: string
  createdAt?: string
  name?: string
  description?: string
  elements?: ExerciseElements
}

/**
 * Exercise Class
 * @param id
 * @param createdAt
 * @param name
 * @param description
 * @param elements
 */
export class Exercise extends _Action {
  elements: ExerciseElements

  constructor({
    id,
    createdAt,
    name,
    description,
    elements = {
      hasConfirm: false,
      hasSets: false,
      hasDuration: false,
      hasDistance: false,
      hasWeight: false,
      hasReps: false,
    },
  }: ExerciseParams = {}) {
    super({ id, createdAt, name, description })
    this.elements = elements
  }
}
