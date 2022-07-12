import { _Activity, type IActivity } from './_Activity'
import { isBoolean } from '@/utils/validators'

export interface IMeasurement extends IActivity {
  trackLbs: boolean
  trackInches: boolean
  trackFeet: boolean
  trackPercent: boolean
  trackNumber: boolean
}

/**
 * Measurement Class
 * @param params IMeasurement
 */
export class Measurement extends _Activity {
  protected trackLbs: boolean
  protected trackInches: boolean
  protected trackFeet: boolean
  protected trackPercent: boolean
  protected trackNumber: boolean

  constructor(params: IMeasurement) {
    super({
      id: params.id,
      createdAt: params.createdAt,
      name: params.name,
      description: params.description,
      status: params.status,
    })

    if (isBoolean(params.trackLbs)) {
      this.trackLbs = params.trackLbs
    } else {
      throw new Error(`(constructor) Validation failed on trackLbs << ${params.trackLbs} >>`)
    }

    if (isBoolean(params.trackInches)) {
      this.trackInches = params.trackInches
    } else {
      throw new Error(`(constructor) Validation failed on trackInches << ${params.trackInches} >>`)
    }

    if (isBoolean(params.trackFeet)) {
      this.trackFeet = params.trackFeet
    } else {
      throw new Error(`(constructor) Validation failed on trackFeet << ${params.trackFeet} >>`)
    }

    if (isBoolean(params.trackPercent)) {
      this.trackPercent = params.trackPercent
    } else {
      throw new Error(
        `(constructor) Validation failed on trackPercent << ${params.trackPercent} >>`
      )
    }

    if (isBoolean(params.trackNumber)) {
      this.trackNumber = params.trackNumber
    } else {
      throw new Error(`(constructor) Validation failed on trackNumber << ${params.trackNumber} >>`)
    }
  }

  get TrackLbs(): boolean {
    return this.trackLbs
  }

  set TrackLbs(trackLbs: boolean) {
    if (isBoolean(trackLbs)) {
      this.trackLbs = trackLbs
    } else {
      throw new Error(`Validation failed on trackLbs << ${trackLbs} >>`)
    }
  }

  get TrackInches(): boolean {
    return this.trackInches
  }

  set TrackInches(trackInches: boolean) {
    if (isBoolean(trackInches)) {
      this.trackInches = trackInches
    } else {
      throw new Error(`Validation failed on trackInches << ${trackInches} >>`)
    }
  }

  get TrackFeet(): boolean {
    return this.trackFeet
  }

  set TrackFeet(trackFeet: boolean) {
    if (isBoolean(trackFeet)) {
      this.trackFeet = trackFeet
    } else {
      throw new Error(`Validation failed on trackFeet << ${trackFeet} >>`)
    }
  }

  get TrackPercent(): boolean {
    return this.trackPercent
  }

  set TrackPercent(trackPercent: boolean) {
    if (isBoolean(trackPercent)) {
      this.trackPercent = trackPercent
    } else {
      throw new Error(`Validation failed on trackPercent << ${trackPercent} >>`)
    }
  }

  get TrackNumber(): boolean {
    return this.trackNumber
  }

  set TrackNumber(trackNumber: boolean) {
    if (isBoolean(trackNumber)) {
      this.trackNumber = trackNumber
    } else {
      throw new Error(`Validation failed on trackNumber << ${trackNumber} >>`)
    }
  }

  static getTableColumns(): any[] {
    return [
      ..._Activity.getTableColumns(),
      {
        name: 'trackLbs',
        label: 'Track Lbs',
        align: 'left',
        field: (row: Measurement) => row.trackLbs,
        sortable: true,
      },
      {
        name: 'trackInches',
        label: 'Track Inches',
        align: 'left',
        field: (row: Measurement) => row.trackInches,
        sortable: true,
      },
      {
        name: 'trackFeet',
        label: 'Track Feet',
        align: 'left',
        field: (row: Measurement) => row.trackFeet,
        sortable: true,
      },
      {
        name: 'trackPercent',
        label: 'Track Percent',
        align: 'left',
        field: (row: Measurement) => row.trackPercent,
        sortable: true,
      },
    ]
  }

  static getVisibleColumns(): string[] {
    return [
      ..._Activity.getVisibleColumns(),
      'trackLbs',
      'trackInches',
      'trackFeet',
      'trackPercent',
    ]
  }
}
