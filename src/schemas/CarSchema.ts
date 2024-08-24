import { z } from 'zod'

export const addCarValidationSchema = z.object({
  name: z.string({
    required_error: 'Please select a Name',
  }),
  description: z.string({
    required_error: 'A brief description of the car is required',
  }),
  color: z.string({
    required_error: 'The color of the car is required',
  }),
  status: z
    .enum(['available', 'unavailable', 'booked', 'returned'], {
      required_error: 'The status of the car is required',
    })
    .default('available'),
  features: z
    .array(
      z.enum(
        [
          'GPS',
          'Child Seat',
          'Bluetooth',
          'Backup Camera',
          'Heated Seats',
          'Sunroof',
          'All-Wheel Drive',
        ],
        {
          required_error: 'At least one feature is required',
        }
      )
    )
    .min(1, {
      message: 'At least one feature is required',
    }),
  pricePerHour: z.number({
    required_error: 'The cost per hour of booking is required',
  }),
  location: z.enum(
    [
      'New York',
      'Los Angeles',
      'Chicago',
      'Houston',
      'Phoenix',
      'Philadelphia',
      'San Antonio',
      'San Diego',
      'Dallas',
      'San Jose',
    ],
    {
      required_error: 'The location of the car is required',
    }
  ),
  images: z
    .array(z.string(), {
      required_error: 'At least one image of the car is required',
    })
    .min(1, {
      message: 'At least one image of the car is required',
    }),
  year: z.number({
    required_error: 'The manufacturing year of the car is required',
  }),
  model: z.string({
    required_error: 'The model of the car is required',
  }),
  seats: z.number({
    required_error: 'The number of seats is required',
  }),
  fuelType: z.enum(['Petrol', 'Diesel', 'Electric', 'Hybrid'], {
    required_error: 'The fuel type of the car is required',
  }),
  transmission: z.enum(['automatic', 'manual'], {
    required_error: 'The transmission type is required',
  }),
})
