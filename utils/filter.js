import { ref, computed } from "vue";

export function onlyUnique(value, index, array){ return array.indexOf(value) == index}

export const filterValues = ref({
    title: '',
    category: [],
    description: ''
})

export const loadFilter = (products) => {
    return computed(()=>{
        
        let output = products.value.products

        if(filterValues.value.title && filterValues.value.title.trim().length>0){
            output = output.filter(p => p.title.toLowerCase().includes(filterValues.value.title.trim().toLowerCase()))
        }
        if(filterValues.value.description && filterValues.value.description.trim().length>0){
            output = output.filter(p => p.description.toLowerCase().includes(filterValues.value.description.trim().toLowerCase()))
        }

        if(filterValues.value.category.length>0){
            output = output.filter(p => filterValues.value.category.includes(p.category))
        }

        return output
    })
}
