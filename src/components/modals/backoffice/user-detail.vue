<script>

import {sendGetDataTable} from "@/components/requests-bdd";
import {validRequest} from "@/components/my-functions";

export default {
  props: {
    user_id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      user: {},
      loading: true,
    };
  },
  methods: {

    getUsers(table, id) {
      let promise = sendGetDataTable(table, id);
      promise.then((res) => {
        if (!validRequest(res)) {
          this.user = res.result;
          // this.loading = false;
        }
      })
    }
  },
  mounted() {
    this.getUsers('users', this.user_id);
    setTimeout(() => {this.loading = false;}, 500);
  }
};
</script>

<template>
  <section style="background-color: #f4f5f7;">
    <div class="container pt-4">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-10">
          <div class="card" style="border-radius: .5rem;">
            <div class="row g-0">
              <div class="col-md-4 gradient-custom text-center text-white"
                   style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;">
                <b-skeleton-img v-if="loading" size="xl" />
                <img
                    v-if="!loading"
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    class="img-fluid my-5"
                    style="width: 80px;"
                />
                <b-skeleton v-if="loading" />
                <h5>
                  <span v-if="user.firstname && !loading">{{ user.firstname }}</span>
                  <span v-else-if="!loading">firstname undefined</span>

                  <span v-if="user.lastname && !loading"> {{ user.lastname }}</span>
                  <span v-else-if="!loading"> lastname undefined</span>
                </h5>
                <b-skeleton v-if="loading" />
                <p>
                  <span v-if="user.company && !loading">{{ user.company }} </span>
                  <span v-else-if="!loading">company undefined </span>

                  <span v-if="user.role && !loading"> - {{ user.role }}</span>
                  <span v-else-if="!loading"> - role undefined</span>
                </p>
              </div>
              <div class="col-md-8">
                <div class="card-body p-4">
                  <h3>Information de l'utilisateur</h3>

                  <hr class="mt-0 mb-4">
                  <div class="row pt-1">
                    <div class="col-6 mb-3">
                      <h6>Email</h6>
                      <b-skeleton v-if="loading" />
                      <p v-else-if="user.mail" class="text-muted">{{ user.mail }}</p>
                      <p v-else>mail undefined</p>
                    </div>
                    <div class="col-6 mb-3">
                      <h6>Phone</h6>
                      <b-skeleton v-if="loading" />
                      <p v-else-if="user.phone" class="text-muted">{{ user.phone }}</p>
                      <p v-else>mail undefined</p>

                    </div>
                  </div>

                  <div class="row pt-1">
                    <div class="col-6 mb-3">
                      <h6>Adresse</h6>
                      <b-skeleton v-if="loading" />
                      <p v-else-if="user.address" class="text-muted">{{ user.address }}</p>
                      <p v-else>address undefined</p>

                    </div>
                    <div class="col-6 mb-3">
                      <h6>postal_code</h6>
                      <b-skeleton v-if="loading" />
                      <p v-else-if="user.postal_code" class="text-muted">{{ user.postal_code }}</p>
                      <p v-else>postal_code undefined</p>

                    </div>
                  </div>

                  <div class="row pt-1">
                    <div class="col-6 mb-3">
                      <h6>Pays</h6>
                      <b-skeleton v-if="loading" />
                      <p v-else-if="user.country" class="text-muted">{{ user.country }}</p>
                      <p v-else>country undefined</p>

                    </div>
                    <div class="col-6 mb-3">
                      <h6>city</h6>
                      <b-skeleton v-if="loading" />
                      <p v-else-if="user.city" class="text-muted">{{ user.city }}</p>
                      <p v-else>city undefined</p>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.gradient-custom {
  background: #f6d365;
}
</style>