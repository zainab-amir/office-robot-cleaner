import { FastifyReply, FastifyRequest } from 'fastify';

import { cleanOfficeHandler } from '../robotController';
import { CleanOfficeRequest } from '../../../services/robot/robotService.types';
import { timedExecution } from '../../../utils/helper';
import { Execution, ExecutionData } from '../../../repositories/robot.types';

jest.mock('../../../utils/helper', () => ({
  timedExecution: jest.fn(),
}));

describe('Robot Controller', () => {
  const expectedTimestamp = new Date('2018-05-12T12:45:10.851Z');
  let mockCreateCleaningReport: jest.Mock<Promise<Execution>, [ExecutionData]>;
  let mockRequest: FastifyRequest<{ Body: CleanOfficeRequest }>;
  let mockReply: FastifyReply;

  beforeEach(() => {
    jest.clearAllMocks();

    mockCreateCleaningReport = jest.fn<Promise<Execution>, [ExecutionData]>().mockResolvedValue({
      id: 1,
      timestamp: expectedTimestamp,
      commands: 2,
      result: 4,
      duration: 0.000123,
    });

    mockRequest = {
      body: {
        start: { x: 10, y: 22 },
        commands: [
          {
            direction: 'east',
            steps: 2,
          },
          {
            direction: 'north',
            steps: 1,
          },
        ],
      },
      server: {
        robotDB: {
          createCleaningReport: mockCreateCleaningReport,
        },
      },
    } as unknown as FastifyRequest<{ Body: CleanOfficeRequest }>;

    mockReply = {
      send: jest.fn(),
    } as unknown as FastifyReply;

    (timedExecution as jest.Mock).mockReturnValue(() => ({
      duration: 0.000123,
      result: 4,
    }));
  });

  test('process cleaning request and create report', async () => {
    await cleanOfficeHandler(mockRequest, mockReply);

    expect(mockRequest.server.robotDB.createCleaningReport).toHaveBeenCalledWith({
      commands: 2,
      result: 4,
      duration: 0.000123,
    });

    expect(mockReply.send).toHaveBeenCalledWith({
      id: 1,
      timestamp: expectedTimestamp,
      commands: 2,
      result: 4,
      duration: 0.000123,
    });
  });

  it('should handle database errors', async () => {
    mockCreateCleaningReport.mockRejectedValue(new Error('Database connection failed'));
    await expect(cleanOfficeHandler(mockRequest, mockReply)).rejects.toThrow('Database connection failed');
  });
});
