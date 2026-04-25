document.addEventListener("DOMContentLoaded", function () {
  const pricingButtons = document.querySelectorAll(".open-pricing-modal");
  const pricingModal = document.getElementById("pricingModal");
  const closePricingModal = document.getElementById("closePricingModal");
  const modalPlanTitle = document.getElementById("modalPlanTitle");
  const pricingForm = document.getElementById("pricingForm");
  const pricingSuccessMessage = document.getElementById("pricingSuccessMessage");

  if (
    pricingButtons.length &&
    pricingModal &&
    closePricingModal &&
    modalPlanTitle &&
    pricingForm &&
    pricingSuccessMessage
  ) {
    pricingButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const selectedPlan = button.dataset.plan || "Tarif";
        modalPlanTitle.textContent = `${selectedPlan} tarif`;
        pricingModal.classList.add("show");
        pricingForm.classList.remove("hidden");
        pricingSuccessMessage.classList.add("hidden");
      });
    });

    closePricingModal.addEventListener("click", function () {
      pricingModal.classList.remove("show");
    });

    pricingModal.addEventListener("click", function (e) {
      if (e.target === pricingModal) {
        pricingModal.classList.remove("show");
      }
    });

    pricingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      pricingForm.classList.add("hidden");
      pricingSuccessMessage.classList.remove("hidden");

      setTimeout(() => {
        pricingModal.classList.remove("show");
        pricingForm.reset();
        pricingForm.classList.remove("hidden");
        pricingSuccessMessage.classList.add("hidden");
      }, 1800);
    });
  }
});