import {Entity, model, property} from '@loopback/repository';

@model()
export class Appointment extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  ownerId: string;

  @property({
    type: 'string',
    required: true,
  })
  assignedEmployeeId: string;

  @property({
    type: 'string',
    required: true,
  })
  customerId: string;

  @property({
    type: 'string',
    required: true,
  })
  serviceName: string;

  @property({
    type: 'number',
    required: true,
  })
  cost: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'date',
    required: true,
  })
  startTime: string;

  @property({
    type: 'date',
    required: true,
  })
  endTime: string;

  @property({
    type: 'boolean',
    required: true,
  })
  bookedOnline: boolean;

  @property({
    type: 'date',
    required: true,
  })
  bookedAt: string;

  @property({
    type: 'string',
  })
  comment?: string;

  @property({
    type: 'string',
    required: true,
  })
  cancelToken: string;

  @property({
    type: 'boolean',
    default: false,
  })
  cancelled?: boolean;

  @property({
    type: 'boolean',
  })
  cancelledByCustomer?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  complete?: boolean;


  constructor(data?: Partial<Appointment>) {
    super(data);
  }
}

export interface AppointmentRelations {
  // describe navigational properties here
}

export type AppointmentWithRelations = Appointment & AppointmentRelations;
