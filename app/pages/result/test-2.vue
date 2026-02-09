<template>
  <MpFlex
    direction="column"
    alignItems="center"
    justifyContent="center"
    padding="8"
    backgroundColor="background.surface"
    height="100vh"
  >
    <MpFlex
      direction="column"
      gap="6"
      padding="8"
      backgroundColor="background.stage"
      :class="css({ borderRadius: 'lg', maxWidth: '400px', width: '100%' })"
    >
      <!-- Header -->
      <MpFlex direction="column" gap="2">
        <MpText as="h1" size="h2" weight="semiBold" color="text.default">
          Welcome Back
        </MpText>
        <MpText size="body" color="text.secondary">
          Sign in to continue to your account
        </MpText>
      </MpFlex>

      <!-- Login Form -->
      <MpFlex direction="column" gap="5">
        <!-- Email or Phone Input -->
        <MpFlex direction="column" gap="2">
          <MpText size="label" weight="semiBold" color="text.default">
            Email or Phone Number
          </MpText>
          <MpInput
            id="email-or-phone"
            v-model="emailOrPhone"
            type="text"
            placeholder="Enter your email or phone"
            :is-invalid="isEmailError"
            is-clearable
            is-full-width
            aria-label="Email or phone number"
            aria-describedby="email-error"
          />
          <MpText
            v-if="isEmailError"
            id="email-error"
            size="body-small"
            color="text.danger"
          >
            {{ emailErrorMessage }}
          </MpText>
        </MpFlex>

        <!-- Password Input -->
        <MpFlex direction="column" gap="2">
          <MpFlex alignItems="center" justifyContent="space-between">
            <MpText size="label" weight="semiBold" color="text.default">
              Password
            </MpText>
            <MpTextlink
              variant="primary"
              @click="onForgotPassword"
              aria-label="Forgot password"
            >
              Forgot Password?
            </MpTextlink>
          </MpFlex>
          <MpInputGroup id="password-input-group">
            <MpInput
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              :is-invalid="isPasswordError"
              is-full-width
              aria-label="Password"
              aria-describedby="password-error"
            />
            <MpInputRightAddon id="password-toggle">
              <MpButton
                variant="ghost"
                size="sm"
                :left-icon="showPassword ? 'hide' : 'show'"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                @click="togglePasswordVisibility"
              />
            </MpInputRightAddon>
          </MpInputGroup>
          <MpText
            v-if="isPasswordError"
            id="password-error"
            size="body-small"
            color="text.danger"
          >
            {{ passwordErrorMessage }}
          </MpText>
        </MpFlex>

        <!-- Submit Button -->
        <MpButton
          variant="primary"
          size="md"
          is-full-width
          :is-loading="isLoading"
          @click="onSubmit"
          aria-label="Sign in"
        >
          Sign In
        </MpButton>

        <!-- Alternative Actions -->
        <MpFlex alignItems="center" justifyContent="center" gap="1">
          <MpText size="body" color="text.secondary">
            Don't have an account?
          </MpText>
          <MpTextlink variant="primary" @click="onSignUp"> Sign up </MpTextlink>
        </MpFlex>
      </MpFlex>
    </MpFlex>
  </MpFlex>
</template>

<script setup lang="ts">
// 1. Imports
import { ref } from "vue";
import {
  css,
  MpFlex,
  MpText,
  MpInput,
  MpInputGroup,
  MpInputRightAddon,
  MpButton,
  MpTextlink
} from "@mekari/pixel3";

// 2. Reactive State
const emailOrPhone = ref("");
const password = ref("");
const showPassword = ref(false);
const isLoading = ref(false);
const isEmailError = ref(false);
const emailErrorMessage = ref("");
const isPasswordError = ref(false);
const passwordErrorMessage = ref("");

// 3. Functions
const validateForm = (): boolean => {
  let isValid = true;

  // Reset errors
  isEmailError.value = false;
  emailErrorMessage.value = "";
  isPasswordError.value = false;
  passwordErrorMessage.value = "";

  // Validate email or phone
  if (!emailOrPhone.value.trim()) {
    isEmailError.value = true;
    emailErrorMessage.value = "Email or phone number is required";
    isValid = false;
  }

  // Validate password
  if (!password.value.trim()) {
    isPasswordError.value = true;
    passwordErrorMessage.value = "Password is required";
    isValid = false;
  } else if (password.value.length < 6) {
    isPasswordError.value = true;
    passwordErrorMessage.value = "Password must be at least 6 characters";
    isValid = false;
  }

  return isValid;
};

const onSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  isLoading.value = true;

  try {
    // Mock API call - Replace with actual authentication logic
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Login successful:", {
      emailOrPhone: emailOrPhone.value,
      password: "********"
    });

    // TODO: Redirect to dashboard or home page
    alert("Login successful!");
  } catch (error) {
    console.error("Login failed:", error);
    isEmailError.value = true;
    emailErrorMessage.value = "Invalid email/phone or password";
  } finally {
    isLoading.value = false;
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const onForgotPassword = () => {
  // TODO: Navigate to forgot password page
  console.log("Forgot password clicked");
  alert("Redirecting to forgot password page...");
};

const onSignUp = () => {
  // TODO: Navigate to sign up page
  console.log("Sign up clicked");
  alert("Redirecting to sign up page...");
};
</script>
