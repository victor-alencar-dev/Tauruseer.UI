import { ExternalService } from "./external-dataservice.model";
export interface ExternalDataSource {
	id: ExternalService;
	key: string;
	name: string;
	imgPath: string;
}
