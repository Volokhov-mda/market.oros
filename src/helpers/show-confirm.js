import Swal from "sweetalert2/dist/sweetalert2.all";

const showConfirm = async (text) => {
  const result = await Swal.fire({
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Подтвердить",
    cancelButtonText: "Отменить"
  });

  return result.isConfirmed;
};

export default showConfirm;
