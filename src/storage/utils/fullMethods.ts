import {
  ApprovalForAllWodTools,
  buyTools,
  isUnlimitedApproveTools,
} from "./method";

export const fullBuyTools = async (
  numberOfRepairs: any,
  items: any,
  rarites: any
) => {
  if (!(await isUnlimitedApproveTools())) {
    await ApprovalForAllWodTools();
  }
  buyTools(items, parseInt(numberOfRepairs.toString()), rarites);
};
