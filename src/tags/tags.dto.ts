import { TagQuestion } from './../tag-questions/tag-questions.entity';
import { GetDto } from './../models/generic.model';
export class TagDto {
  id?: string;
}

export class ResTagDto {
  id?: string;
  tag_name: string;
  questions?: TagQuestion[];
}

export class TagGetDto extends GetDto { }
