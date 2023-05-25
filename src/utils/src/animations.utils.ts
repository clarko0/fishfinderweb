import { sleep } from "@/storage/utils/tools";

export const Animations = {
  async Rotation(event: any) {
    event.target.style.transform = "rotate(90deg)";
    await sleep(300);
    event.target.style.transform = "rotate(180deg)";
  },
};
