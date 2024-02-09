<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getDataChanged_collection } from '@/crudFirebase'

const route = useRoute()
const { sala, nombre } = route.params

const collection = 'IOT'
const datos = ref([])
// Obtener datos
getDataChanged_collection(collection, (el) => {
    datos.value = el.docs.map(doc => ({ 
      id: doc.id, 
      data: doc.data()
    }))
})

</script>

<template>
    <div>
    <p style="text-align: center;">Solo están aplicadas las rutas con parámetros para comprobar su uso, la modificación de los datos está en el otro componente</p>
      <div v-for="dato in datos" :key="dato.id">
        <div v-if="dato.data.nombre === sala">        
          <div v-for="(value, key) in dato.data" :key="key">
            <template v-if="key === nombre">
               <h1 style="text-align: center;">{{ sala }}</h1>
               <h3 style="text-align: center;">{{ nombre }} : {{ value.valor }}</h3>
            </template>
          </div>
        </div>
        <div v-else>
            <h1 style="text-align: center;">Esté dispositivo no está en Firebase</h1>
        </div>
      </div>
    </div>
  </template>
  