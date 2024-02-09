<script setup>
import { ref } from 'vue'
import { getDataChanged_collection, updateData } from '@/crudFirebase'

const collection = 'IOT'
const datos = ref([])
// Obtener datos
getDataChanged_collection(collection, (el) => {
    datos.value = el.docs.map(doc => ({ 
      id: doc.id, 
      data: doc.data()
    }))
})
// Actualizar valor
const actualizarValor = async(id, nuevoValor, dispositivo) => {
  try {
    await updateData(id, collection, { [dispositivo]: { tipo: 'sensor',valor: nuevoValor } });
  } catch (error) {
    console.error('Error al actualizar el valor:', error)
  }
}
</script>

<template>
  <div class="container">
    <div v-for="dato in datos" :key="dato.id" class="sala">
        <h2 class="titulo">{{ dato.data.nombre }}</h2>
      <div v-for="(value, key) in dato.data" :key="key">
        <div v-if="key !== 'nombre'" class="datos">
          <div v-if="value.tipo === 'sensor'">
            <router-link :to="{ name: 'dispositivo', params: { sala: dato.data.nombre, nombre: key }}">{{ value.tipo }}</router-link>
            <input type="text" :value="key" disabled>
            <input type="number" v-model="value.valor" @change="actualizarValor(dato.id, value.valor, key)">
          </div>
          <div v-else>
            <router-link :to="{ name: 'dispositivo', params: { sala: dato.data.nombre, nombre: key }}">{{ value.tipo }}</router-link>
            <input type="text" :value="key" disabled>
            <input type="checkbox" v-model="value.valor" disabled>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sala {
  width: 400px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 15px;
  background-color: beige;
  margin-bottom: 20px;
  box-shadow: 2px 2px 5px black;
}

.titulo {
  margin-top: 0px;
  margin-bottom: 10px;
  font-style: italic;
  font-size: 25px;
  text-align: center;
}


.datos {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 5px;
}

.datos input[type="text"],
.datos input[type="number"] {
  margin-right: 15px;
  margin-left: 15px;
  padding: 8px;
  border-radius: 4px;
  width: 60px;
  text-align: center;
}

.datos input[type="checkbox"] {
  margin-right: 15px;
  margin-left: 15px;
  width: 80px;
  height: 20px;
}

</style>