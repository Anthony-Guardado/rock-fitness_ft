<template>
  <div class="bg-[#1F232A] border border-[#23374D] rounded-xl p-6 w-full max-w-md">

    <h3 class="text-[#F5F5F5] text-lg font-bold mb-4">
      Pagar membresía
    </h3>

    <!-- Stripe insertará aquí el input de tarjeta -->
    <div id="card-element" class="bg-white rounded-lg p-3"></div>

    <Button
      label="Confirmar pago"
      class="w-full mt-4"
      :loading="loading"
      @click="pagar"
    />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { loadStripe } from '@stripe/stripe-js'

const props = defineProps({
  clientSecret: String
})

const stripe = ref(null)
const elements = ref(null)
const cardElement = ref(null)
const loading = ref(false)

onMounted(async () => {

  stripe.value = await loadStripe('pk_test_51T9HtjAt6Wk0y7PJWVQGgdKlVXmrlXJQHr6GsIYcvhCrgQEaceFMwZXQ8MauXafUFBorD8aF81Ru58Heg8ruYt9m00Hhp17uPI')

  elements.value = stripe.value.elements({
    clientSecret: props.clientSecret
  })

  cardElement.value = elements.value.create('card')

  cardElement.value.mount('#card-element')

})

const pagar = async () => {

  loading.value = true

  try {

    const { error, paymentIntent } =
      await stripe.value.confirmCardPayment(props.clientSecret, {
        payment_method: {
          card: cardElement.value
        }
      })

    if (error) {
      console.error(error.message)
      return
    }

    console.log('Pago exitoso', paymentIntent)

  } catch (error) {
    console.error(error)

  } finally {
    loading.value = false
  }
}
</script>
