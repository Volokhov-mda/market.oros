import Swal from "sweetalert2/dist/sweetalert2.all";

const showConfirm = async (text) => {
  const result = await Swal.fire({
    title: "Attention",
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Confirm",
  });

  return result.isConfirmed;
};

export default showConfirm;
