import { Test, TestingModule } from '@nestjs/testing';
import { SyncronizeDatabaseService } from './syncronize-database.service';
import { getModelToken } from '@nestjs/mongoose';
import { Film } from '../entities/film.entity';
import { Starship } from '../entities/starship.entity';
import { People } from '../entities/people.entity';
import { Planet } from '../entities/planet.entity';
import axios from 'axios';

jest.mock('axios');

describe('SyncronizeDatabaseService', () => {
  let service: SyncronizeDatabaseService;
  let mockFilmModel;
  let mockStarshipModel;
  let mockPeopleModel;
  let mockPlanetModel;

  beforeEach(async () => {

    mockFilmModel = { findOneAndUpdate: jest.fn(), save: jest.fn() };
    mockStarshipModel = { findOneAndUpdate: jest.fn(), save: jest.fn() };
    mockPeopleModel = { findOneAndUpdate: jest.fn(), save: jest.fn() };
    mockPlanetModel = { findOneAndUpdate: jest.fn(), save: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SyncronizeDatabaseService,
        {
          provide: getModelToken(Film.name),
          useValue: mockFilmModel,
        },
        {
            provide: getModelToken(People.name),
            useValue: mockPeopleModel,
        },
        {
          provide: getModelToken(Starship.name),
          useValue: mockStarshipModel,
        },
        {
          provide: getModelToken(Planet.name),
          useValue: mockPlanetModel,
        },
      ],
    }).compile();

    service = module.get<SyncronizeDatabaseService>(SyncronizeDatabaseService);

  });

  describe('fetchData', () => {
    it('should fetch data from API', async () => {
      const mockData = { data: { results: [] } };
      (axios.get as jest.Mock).mockResolvedValue(mockData);

      const result = await service.fetchData('https://someurl.com');
      expect(result).toEqual(mockData.data);
      expect(axios.get).toHaveBeenCalledWith('https://someurl.com');
    });

    it('should throw an error if the request fails', async () => {
        const testUrl = 'https://someurl.com';
        (axios.get as jest.Mock).mockRejectedValue(new Error("Error fetching data from " + testUrl));
        await expect(service.fetchData(testUrl)).rejects.toThrow("Error fetching data from " + testUrl);
      });

  });

  describe('getAllResults', () => {
    beforeEach(() => {
      service.fetchData = jest.fn();
    });

    it('should aggregate results from paginated API', async () => {
      (service.fetchData as jest.Mock)
        .mockResolvedValueOnce({ results: ['result1'], next: 'url2' })
        .mockResolvedValueOnce({ results: ['result2'], next: null });

      const results = await service.getAllResults('initialUrl');
      expect(results).toEqual(['result1', 'result2']);
      expect(service.fetchData).toHaveBeenCalledTimes(2);
    });

    it('should handle errors', async () => {
      (service.fetchData as jest.Mock).mockRejectedValue(new Error('Error fetching data'));
      await expect(service.getAllResults('initialUrl')).rejects.toThrow('Error fetching data');
    });
  });

});
