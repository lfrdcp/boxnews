import axios from 'axios';
import { URL } from '../data/url';

export const mixinSnackbar = {
  data: () => ({
    snackbarIcon: '',
    snackbarState: false,
    snackbarColor: '',
    snackbarContent: '',
  }),
  methods: {
    setSnackbar(icon, color, content) {
      this.snackbarState = true;
      this.snackbarIcon = icon;
      this.snackbarColor = color;
      this.snackbarContent = content;
      setTimeout(() => (this.snackbarState = false), 8000);
    },

    setSnackbarCatch(error, msg404, msg500, msgUn) {
      if (error.response.status === 404) {
        this.setSnackbar(this.icons.error, 'red', msg404);
      } else if (error.response.status === 500) {
        this.setSnackbar(this.icons.error, 'red', msg500);
      } else {
        this.setSnackbar(this.icons.error, 'red', msgUn);
      }
    },
  },
};

export const mixinAlert = {
  data: () => ({
    alertIcon: '',
    alertText: '',
    alertColor: '',
    alertState: false,
  }),
  methods: {
    setAlert(icon, text, color, time = 5000) {
      this.alertIcon = icon;
      this.alertText = text;
      this.alertColor = color;
      this.alertState = true;
      setTimeout(() => (this.alertState = false), time);
    },
  },
};

export const mixinUser = {
  data: () => ({
    loading: '',
  }),
  methods: {
    async setUser() {
      try {
        this.loading = true;
        let response = await axios.get(URL + 'api/user/current');
        this.$store.commit('user/setUser', response.data.user);
      } catch (error) {
        this.setSnackbarCatch(
          error,
          this.errorUser.setUpUser404,
          this.errorUser.setUpUser500,
          this.errorUser.setUpUserUn
        );
      } finally {
        this.loading = false;
      }
    },
  },
};
