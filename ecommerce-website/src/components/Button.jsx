export default function Button({ buttonText = "View All Products" }) {
  return (
    <button
      className={`bg-red-600 text-white px-8 py-3 rounded font-semibold active:scale-95`}
    >
      {buttonText}
    </button>
  );
}
