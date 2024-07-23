// formValidation.js
export const validateForm = (formData) => {
  const errors = {};

  if (!formData.tanggal) {
    errors.tanggal = "Tanggal is required";
  }

  if (!formData.time) {
    errors.time = "Time is required";
  }

  if (!formData.agenda) {
    errors.agenda = "Agenda is required";
  }

  if (!formData.UPS) {
    errors.UPS = "Unit Pengirim Surat is required";
  }

  if (!formData.loc) {
    errors.loc = "Location is required";
  }

  if (!formData.disposisiIds || formData.disposisiIds.length === 0) {
    errors.disposisi = "Disposisi is required";
  }

  return errors;
};
