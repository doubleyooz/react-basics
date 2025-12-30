import { Creator } from "./creator.model";

export interface Category {
  id: string;
  title: string;
  icon: string;
  creators: Creator[];
}