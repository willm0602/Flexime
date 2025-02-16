import cities from '@/data/cities.json'
import { Location } from '@/lib/jsonResume'
import Typeahead from './Typeahead'

export default function EditLocation(props: {
    onLocationSet: (location: Location) => unknown | undefined
    val: Location | undefined
    wrapperClassName?: string
    listItemClassName?: string
    listClassName?: string
    inputClassName?: string
    buttonClassName?: string
    placeholder?: string
}) {
    const {
        onLocationSet,
        val,
        wrapperClassName,
        listItemClassName,
        listClassName,
        inputClassName,
        buttonClassName,
        placeholder,
    } = props

    return (
        <Typeahead
            vals={cities as Location[]}
            getDisplay={(city: Location) => {
                return `${city.city} ${city.region} (${city.countryCode})`
            }}
            selectedVal={val}
            onSelect={onLocationSet}
            wrapperClassName={wrapperClassName}
            listItemClassName={listItemClassName}
            listClassName={listClassName}
            inputClassName={inputClassName}
            buttonClassName={buttonClassName}
            placeholder={placeholder}
        />
    )
}
