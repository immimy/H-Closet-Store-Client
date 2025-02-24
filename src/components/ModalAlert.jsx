const ModalAlert = ({ handleConfirmLeave, handleCancel }) => {
  return (
    <div className='fixed inset-0 z-10 bg-black/50 flex justify-center items-center'>
      <div className='p-6 w-3/4 max-w-sm bg-base-100 rounded shadow-xl'>
        <h6 className='text-center text-lg tracking-tight text-base-content'>
          You have not checked out yet.
          <br />
          Are you sure you want to leave?
        </h6>
        <div className='mt-6 flex justify-end gap-x-4'>
          <button
            className='btn uppercase tracking-widest rounded-none'
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className='btn btn-error uppercase tracking-widest rounded-none'
            onClick={handleConfirmLeave}
          >
            Leave Page
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalAlert;
