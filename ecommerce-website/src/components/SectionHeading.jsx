export default function SectionHeading({ sectionHeading = "Today's" }) {
  return (
    <div className="flex items-center gap-4  ">
      <div className="w-[20px] h-[40px] md:h-[50px] bg-red-600 rounded-md "></div>
      <h2 className=" font-[500] md:text-4xl sm:text-xl text-md">{sectionHeading}</h2>
    </div>
  );
}
