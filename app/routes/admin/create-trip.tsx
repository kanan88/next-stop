import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns'
import {
  LayerDirective,
  LayersDirective,
  MapsComponent
} from '@syncfusion/ej2-react-maps'
import { Header } from 'components'
import { formatKey } from 'lib/utils'
import { useState } from 'react'
import { comboBoxItems, selectItems } from '~/constants'
import { world_map } from '~/constants/world_map'
import type { Route } from './+types/create-trip'

export const loader = async () => {
  const response = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,flag,latlng,maps'
  )
  const data = await response.json()

  return data.map((country: any) => ({
    name: country.flag + ' ' + country.name.common,
    coordinates: country.latlng,
    value: country.name.common,
    openStreetMap: country.maps.openStreetMap
  }))
}

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
  const countries = loaderData as Country[]

  const [formData, setFormData] = useState<TripFormData>({
    country: countries[0]?.name || '',
    travelStyle: '',
    interest: '',
    budget: '',
    duration: 0,
    groupType: ''
  })

  const countryData = countries.map(country => ({
    text: country.name,
    value: country.value
  }))

  const mapData = [
    {
      country: formData.country,
      color: '#EA382E',
      coordinates:
        countries.find((c: Country) => c.name === formData.country)
          ?.coordinates || []
    }
  ]

  const handleSubmit = async () => {}

  const handleChange = (key: keyof TripFormData, value: string | number) => {
    setFormData({ ...formData, [key]: value })
  }

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Add A New Trip"
        description="View and edit AI-generated travel plans"
      />

      <section className="mt-2.5 wrapper-md">
        <form className="trip-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">Country</label>
            <ComboBoxComponent
              id="country"
              dataSource={countryData}
              fields={{ value: 'value', text: 'text' }}
              placeholder="Select a country"
              className="combo-box"
              change={(e: { value: string | undefined }) => {
                if (e.value) {
                  handleChange('country', e.value)
                }
              }}
              allowFiltering
              filtering={e => {
                const query = e.text.toLowerCase()
                e.updateData(
                  countryData
                    .filter(country =>
                      country.text.toLowerCase().includes(query)
                    )
                    .map(country => ({
                      text: country.text,
                      value: country.value
                    }))
                )
              }}
            />
          </div>
          <div>
            <label htmlFor="duration">Duration</label>
            <input
              name="duration"
              placeholder="Enter a number of days (5, 12...)"
              className="form-input placeholder:text-gray-100"
              onChange={e => handleChange('duration', Number(e.target.value))}
            />
          </div>

          {selectItems.map(key => (
            <div key={key}>
              <label htmlFor={key}>{formatKey(key)}</label>

              <ComboBoxComponent
                id={key}
                dataSource={comboBoxItems[key].map(item => ({
                  text: item,
                  value: item
                }))}
                fields={{ value: 'value', text: 'text' }}
                placeholder={`Select ${formatKey(key)}`}
                change={(e: { value: string | undefined }) => {
                  if (e.value) {
                    handleChange(key, e.value)
                  }
                }}
                allowFiltering
                filtering={e => {
                  const query = e.text.toLowerCase()
                  e.updateData(
                    comboBoxItems[key as keyof typeof comboBoxItems]
                      .filter(item => item.toLowerCase().includes(query))
                      .map(item => ({
                        text: item,
                        value: item
                      }))
                  )
                }}
                className="combo-box"
              />
            </div>
          ))}

          <div>
            <label htmlFor="location">Location on the world map</label>
            <MapsComponent>
              <LayersDirective>
                <LayerDirective
                  shapeData={world_map}
                  dataSource={mapData}
                  shapePropertyPath="name"
                  shapeDataPath="country"
                  shapeSettings={{ colorValuePath: 'color', fill: '#E5E5E5' }}
                />
              </LayersDirective>
            </MapsComponent>
          </div>
        </form>
      </section>
    </main>
  )
}

export default CreateTrip
