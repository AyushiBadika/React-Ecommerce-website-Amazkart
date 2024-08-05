export default function Button({ buttonText = "View All Products" }) {
  return (
    <button
      className={`bg-red-600 text-white px-4 py-3 rounded font-semibold active:scale-95 md:text-lg text-sm`}
    >
      {buttonText}
    </button>
  );
}
