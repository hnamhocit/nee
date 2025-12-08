import { CaretDownIcon } from "@phosphor-icons/react";

const Notification = () => {
  return (
    <div className="bg-black text-white flex items-center justify-center h-12">
      <div className="flex items-center gap-24">
        <div className="flex items-center gap-3">
          <div className="font-medium">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </div>

          <div className="border-b-2 font-bold font-serif">Show now</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="font-medium">English</div>
          <CaretDownIcon />
        </div>
      </div>
    </div>
  );
};

export default Notification;
