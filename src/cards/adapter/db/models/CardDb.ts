import { Document } from '../../../../foundation/db/adapter/nest/models/Document';
import { LorcanaCard } from '../../../domain/models/LorcanaCard';
import { MtgCard } from '../../../domain/models/MtgCard';

type NoIdCardDb = Omit<LorcanaCard, 'id'> | Omit<MtgCard, 'id'>;

// Not the best way to define the db type
export type CardDb = Document & NoIdCardDb;
