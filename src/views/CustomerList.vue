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

    <h1 v-if="please_wait" style="color: red;">PLEASE WAIT...</h1>

    <br/>
    <br/>

    <table class="table table-border table-striped">
      <tr><th>first</th><th>last</th><th>email</th></tr>
      <tr v-for="(customer, index) in customers" v-bind:key="customer._id">
        <td>
          <span v-if="editing_record == customer._id">
            <input type="text" v-model="customer.first_name"/>
          </span>
          <span v-else>
            {{ customer.first_name  }}
          </span>
        </td>
        <td>
          <span v-if="editing_record == customer._id">
            <input type="text" v-model="customer.last_name"/>
          </span>
          <span v-else>
            {{ customer.last_name  }}
          </span>
        </td>
        <td>
          <span v-if="editing_record == customer._id">
            <input type="text" v-model="customer.email"/>
          </span>
          <span v-else>
            {{ customer.email  }}
          </span>
        </td>
        <td>
          <span v-if="editing_record == customer._id">
            <button @click="saveCustomer(customer)">SAVE</button>
            <button @click="cancelCustomer()">CANCEL</button>
          </span>
          <span v-else>
            <button @click="deleteCustomer(customer, index)">DELETE</button>
            <button @click="editCustomer(customer)">EDIT</button>
          </span>
        </td>
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
      please_wait: false,
      editing_record: 0,
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
    editCustomer: function(customer) {
      console.log(customer);
      //alert("you clicked edit");
      this.editing_record = customer._id;

    },
    saveCustomer: function(customer) {
      console.log(customer);

      console.log("saving customer " + customer._id);

      let cust = this.customers.filter(c => c._id == customer._id);

      let data = { customer: cust[0] };

      var url = "http://localhost:8080/api/customers/";

      this.please_wait = true;

      axios.put(url, data)
      .then((response) => {
        //alert("saved!");
        this.please_wait = false;
        console.log(response);
        this.editing_record = 0;
      }, (error) => {
        this.please_wait = false;
        console.log(error);
        alert("Error updating customer.");
      });


    },
    cancelCustomer: function() {
      this.editing_record = 0;
    },
    showHideForm: function() {
      this.show_add_new_form = !this.show_add_new_form;
    },
    getCustomers: function() {
      this.please_wait = true;

      var url = "http://localhost:8080/api/customers/";
      axios.get(url, {})
        .then((response) => {
          this.please_wait = false;
          this.customers = response.data;
        })
    },
    createCustomer: function() {

      if (this.new_customer.last_name.length > 100 || this.new_customer.first_name.length > 100
      || this.new_customer.email.indexOf("@") == -1) {
        alert("you did something dumb");
        return;
      }

      this.please_wait = true;

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
        this.please_wait = false;
      }, (error) => {
        this.please_wait = false;
        alert("Error adding new customer");
        console.log(error);
      });
    },
    deleteCustomer: function(customer, index) {
      this.please_wait = true;
      var url = "http://localhost:8080/api/customers/" + customer._id;
      axios.delete(url, {
        headers: {},
        data: {}
      })
      .then((response) => {
        this.please_wait = false;
        console.log(response);
        this.$delete(this.customers, index);
      }, (error) => {
        this.please_wait = false;
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