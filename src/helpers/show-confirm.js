import Swal from "sweetalert2/dist/sweetalert2.all";

const showConfirmRu = async (text) => {
  const result = await Swal.fire({
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Подтвердить",
    cancelButtonText: "Отменить",
  });

  return result.isConfirmed;
};

const showConfirmEng = async (text) => {
  const result = await Swal.fire({
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Accept",
    cancelButtonText: "Decline",
  });

  return result.isConfirmed;
};

export { showConfirmRu, showConfirmEng };
