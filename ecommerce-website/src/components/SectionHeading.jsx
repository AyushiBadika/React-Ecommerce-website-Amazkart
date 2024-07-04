export default function SectionHeading({ sectionHeading = "Today's" }) {
  return (
    <div className="flex items-center gap-4 mb-8 ">
      <div className="w-[30px] h-[60px]  bg-red-600 rounded-md "></div>
      <h2 className="text-red-600 font-bold">{sectionHeading}</h2>
    </div>
  );
}
