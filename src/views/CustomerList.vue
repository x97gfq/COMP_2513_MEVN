<template>
<div class="container">
  <div class="customers">
    <h1>Customers:</h1>

    <div v-if="show_add_new_form">
      <p>Create new customer:</p>

      First name:
      <input type="text" v-model="new_customer.first_name"/>
      Last name:
      <input type="text" v-model="new_customer.last_name"/>
      Email:
      <input type="text" v-model="new_customer.email"/>

      <button @click="createCustomer()">ADD NEW</button>
    </div>

    <br/>

    <button @click="showHideForm()" v-if="!show_add_new_form">Show Add New Form</button>

    <br/>
    <br/>

    <table class="table table-border table-striped">
      <tr><th>first</th><th>last</th><th>email</th></tr>
      <tr v-for="(customer, index) in customers" v-bind:key="customer._id">
        <td>{{ customer.first_name  }}</td><td>{{ customer.last_name }}</td><td> {{ customer.email }}</td>
        <td><button @click="deleteCustomer(customer, index)">DELETE</button></td>
      </tr>
    </table>

  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "CustomerList",
  data() {
    return {
      show_add_new_form: false,
      customers: [],
      new_customer: {
        first_name: "",
        last_name: "",
        email: ""
      }
    }
  },
  methods: {
    showHideForm: function() {
      this.show_add_new_form = !this.show_add_new_form;
    },
    getCustomers: function() {
      var url = "http://localhost:8080/api/customers/";
      axios.get(url, {})
        .then((response) => {
          this.customers = response.data;
        })
    },
    createCustomer: function() {
      var url = "http://localhost:8080/api/customers/";
      axios.post(url, {
          first_name: this.new_customer.first_name,
          last_name: this.new_customer.last_name,
          email: this.new_customer.email
        },
        {
          headers: { }
      })
      .then((response) => {
        this.customers.push(response.data)
        this.new_customer.first_name = "";
        this.new_customer.last_name = "";
        this.new_customer.email = "";
        this.show_add_new_form = false;
      }, (error) => {
        alert("Error adding new customer");
        console.log(error);
      });
    },
    deleteCustomer: function(customer, index) {
      var url = "http://localhost:8080/api/customers/" + customer._id;
      axios.delete(url, {
        headers: {},
        data: {}
      })
      .then((response) => {
        console.log(response);
        this.$delete(this.customers, index);
      }, (error) => {
        console.log(error);
      });
    }
  },
  mounted() {
    this.getCustomers();
  }
}
</script>

<style scoped>
.customers {
  background-color: whitesmoke;
}
</style>