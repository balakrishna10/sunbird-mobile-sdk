import {StorageHandler} from './storage-handler';
import { AppConfig } from '../../api/config/app-config';
import { FileService } from '../../util/file/def/file-service';
import { DbService, DeviceInfo } from '../..';
import { Observable } from 'rxjs';
import { ContentUtil } from '../../content/util/content-util';
import { async } from 'rxjs/internal/scheduler/async';
import { of } from 'rxjs';

describe('StorageHandler', () => {
    let storageHandler: StorageHandler;
    const mockAppConfig: Partial<AppConfig> = {};
    const mockFileService: Partial<FileService> = {};
    const mockDbService: Partial<DbService> = {};
    const mockDeviceInfo: Partial<DeviceInfo> = {};

    beforeAll(() => {
        storageHandler = new StorageHandler(
            mockAppConfig as AppConfig,
            mockFileService as FileService,
            mockDbService as DbService,
            mockDeviceInfo as DeviceInfo
        );
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be create a instance of StorageHandler', () => {
        expect(storageHandler).toBeTruthy();
    });

    it('should extract a content from item', async(done) => {
        // arrange
        const identifier = 'SAMPLE_IDENTIFIER';
        const storageFolder = 'STORAGE_FOLDER_PATH';
        const keepLowerVersion = true;
        mockFileService.readAsText = jest.fn().mockImplementation(() => {});
        (mockFileService.readAsText as jest.Mock).mockResolvedValue('{"ver": "1.0", "archive": {"items": ["item_1"]}}');
        mockDbService.read = jest.fn().mockImplementation(() => {});
        (mockDbService.read as jest.Mock).mockReturnValue(of([{
            identifier: 'IDENTIFIER',
            server_data: 'SERVER_DATA',
            local_data: '{"childNodes": [{"DOWNLOAD": 1}, "do_234", "do_345"], "artifactUrl": "http:///do_123"}',
            mime_type: 'application/vnd.ekstep.content-collection',
            manifest_version: 'MAINFEST_VERSION',
            content_type: 'CONTENT_TYPE',
            content_state: 2,
            visibility: 'Default'
        }]));
        spyOn(ContentUtil, 'doesContentExist').and.returnValue(true);
        mockFileService.getDirectorySize = jest.fn().mockImplementation(() => {});
        (mockFileService.getDirectorySize as jest.Mock).mockReturnValue(256);
        mockDeviceInfo.getDeviceID = jest.fn().mockImplementation(() => {});
        (mockDeviceInfo.getDeviceID as jest.Mock).mockReturnValue(of(''));
        mockDbService.beginTransaction = jest.fn().mockImplementation(() => of());
        mockDbService.update = jest.fn().mockImplementation(() => of());
        mockDbService.endTransaction = jest.fn().mockImplementation(() => {});
        // act
        await storageHandler.addDestinationContentInDb(identifier, storageFolder, keepLowerVersion).then(() => {
             // assert
            done();
        });
    });

    it('should delete a content from DB', async(done) => {
        // arrange
        const deletedIdentifiers = ['SAMPALE_1', 'SAMPLE_2'];
        mockDbService.execute = jest.fn().mockImplementation(() => {});
        (mockDbService.execute as jest.Mock).mockReturnValue(of([{
            identifier: 'IDENTIFIER',
            server_data: 'SERVER_DATA',
            local_data: '{"childNodes": [{"DOWNLOAD": 1}, "do_234", "do_345"], "artifactUrl": "http:///do_123"}',
            mime_type: 'application/vnd.ekstep.content-collection',
            manifest_version: 'MAINFEST_VERSION',
            content_type: 'CONTENT_TYPE',
            content_state: 2,
            visibility: 'Default'
        }]));
        mockDbService.beginTransaction = jest.fn().mockImplementation(() => {});
        mockDbService.update = jest.fn().mockImplementation(() => {});
        (mockDbService.update as jest.Mock).mockReturnValue(of({}));
        mockDbService.endTransaction = jest.fn().mockImplementation(() => {});
        // act
        await storageHandler.deleteContentsFromDb(deletedIdentifiers).then(() => {
             // assert
            done();
        });
    });
});
