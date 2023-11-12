import { Test, TestingModule } from '@nestjs/testing';
import { StarWarsService } from './star-wars.service';
import { getModelToken } from '@nestjs/mongoose';
import { Film } from './entities/film.entity';
import { Starship } from './entities/starship.entity';
import { People } from './entities/people.entity';
import { Planet } from './entities/planet.entity';

describe('StarWarsService', () => {
  let service: StarWarsService;
  let mockFilmModel;
  let mockStarshipModel;
  let mockPeopleModel;
  let mockPlanetModel;

  beforeEach(async () => {

    mockFilmModel = {
      find: jest.fn().mockReturnThis(),
      exec: jest.fn(),
    };
    mockStarshipModel = {
      find: jest.fn().mockReturnThis(),
      exec: jest.fn(),
    };
    mockPeopleModel = {
      find: jest.fn().mockReturnThis(),
      exec: jest.fn(),
    };
    mockPlanetModel = {
      find: jest.fn().mockReturnThis(),
      exec: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarWarsService,
        {
          provide: getModelToken(Film.name),
          useValue: mockFilmModel,
        },
        {
          provide: getModelToken(Starship.name),
          useValue: mockStarshipModel,
        },
        {
          provide: getModelToken(People.name),
          useValue: mockPeopleModel,
        },
        {
          provide: getModelToken(Planet.name),
          useValue: mockPlanetModel,
        },
      ],
    }).compile();

    service = module.get<StarWarsService>(StarWarsService);
  });

  describe('findFilms', () => {
    it('should return an array of films', async () => {
      const result = [{ title: 'A New Hope' }, { title: 'The Empire Strikes Back' }];
      mockFilmModel.find().exec.mockReturnValue(result);

      expect(await service.findFilms()).toEqual(result);
      expect(mockFilmModel.find).toHaveBeenCalled();
    });

    it('should return an array of films filtered by title', async () => {
      const result = [{ title: 'A New Hope' }];
      mockFilmModel.find().exec.mockReturnValue(result);

      expect(await service.findFilms('New')).toEqual(result);
      expect(mockFilmModel.find).toHaveBeenCalledWith({ title: expect.any(RegExp) });
    });

    it('should return an empty array if no films are found', async () => {
      mockFilmModel.find().exec.mockResolvedValue([]);

      expect(await service.findFilms()).toEqual([]);
      expect(mockFilmModel.find).toHaveBeenCalled();
    });


  it('should return filtered films by title', async () => {
    const allFilms = [
      { title: 'A New Hope' },
      { title: 'The Empire Strikes Back' },
      { title: 'Return of the Jedi' },
    ];
    const filteredFilms = allFilms.filter(film => film.title.includes('New'));

    mockFilmModel.find.mockImplementation((query: { title: any; }) => {
      const titleRegex = query.title;
      return {
        exec: jest.fn().mockResolvedValue(allFilms.filter(film => titleRegex.test(film.title))),
      };
    });

    expect(await service.findFilms('New')).toEqual(filteredFilms);
    expect(mockFilmModel.find).toHaveBeenCalledWith({ title: expect.any(RegExp) });
  });
  });

  describe('findStarships', () => {
    it('should return an array of starships', async () => {
      const result = [{ name: 'Millennium Falcon' }, { name: 'Death Star' }];
      mockStarshipModel.find().exec.mockResolvedValue(result);

      expect(await service.findStarships()).toEqual(result);
      expect(mockStarshipModel.find).toHaveBeenCalled();
    });

    it('should return an empty array if no starships are found', async () => {
      mockStarshipModel.find().exec.mockResolvedValue([]);

      expect(await service.findStarships()).toEqual([]);
      expect(mockStarshipModel.find).toHaveBeenCalled();
    });

    it('should return filtered starships by name', async () => {
      const result = [{ name: 'Millennium Falcon' }];
      mockStarshipModel.find().exec.mockResolvedValue(result);

      expect(await service.findStarships('Falcon')).toEqual(result);
      expect(mockStarshipModel.find).toHaveBeenCalledWith({ name: expect.any(RegExp) });
    });
  });

  describe('findPeople', () => {
    it('should return an array of people', async () => {
      const result = [{ name: 'Luke Skywalker' }, { name: 'Darth Vader' }];
      mockPeopleModel.find().exec.mockResolvedValue(result);

      expect(await service.findPeople()).toEqual(result);
      expect(mockPeopleModel.find).toHaveBeenCalled();
    });

    it('should return an empty array if no people are found', async () => {
      mockPeopleModel.find().exec.mockResolvedValue([]);

      expect(await service.findPeople()).toEqual([]);
      expect(mockPeopleModel.find).toHaveBeenCalled();
    });

    it('should return filtered people by name', async () => {
      const result = [{ name: 'Luke Skywalker' }, { name: 'Darth Vader' }];
      mockPeopleModel.find().exec.mockResolvedValue(result);

      expect(await service.findPeople('Luke')).toEqual(result);
      expect(mockPeopleModel.find).toHaveBeenCalledWith({ name: expect.any(RegExp) });
    });
  });

  describe('findPlanets', () => {
    it('should return an array of planets', async () => {
      const result = [{ name: 'Tatooine' }, { name: 'Hoth' }];
      mockPlanetModel.find().exec.mockResolvedValue(result);

      expect(await service.findPlanets()).toEqual(result);
      expect(mockPlanetModel.find).toHaveBeenCalled();
    });

    it('should return an empty array if no planets are found', async () => {
      mockPlanetModel.find().exec.mockResolvedValue([]);

      expect(await service.findPlanets()).toEqual([]);
      expect(mockPlanetModel.find).toHaveBeenCalled();
    });

    it('should return filtered planets by name', async () => {
      const result = [{ name: 'Tatooine' }];
      mockPlanetModel.find().exec.mockResolvedValue(result);

      expect(await service.findPlanets('Tatooine')).toEqual(result);
      expect(mockPlanetModel.find).toHaveBeenCalledWith({ name: expect.any(RegExp) });
    });
  });
});
