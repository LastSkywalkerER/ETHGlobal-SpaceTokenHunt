export type QueuedFuinction = () => Promise<any>;

// TODO: Finish Queue
export class Queue {
  private static queue = [] as QueuedFuinction[];
  private static timer: NodeJS.Timeout | null = null;
  private static current: Promise<any> | null = null;

  public static async add(callback: QueuedFuinction) {
    if (!Queue.timer && !Queue.current) {
      Queue.timer = Queue.cron();

      return new Promise((resolve, reject) => {
        Queue.current = callback()
          .then((data) => {
            Queue.current = null;

            return resolve(data);
          })
          .catch((error) => {
            Queue.current = null;

            return reject(error);
          });
      });
    }
  }

  private static cron() {
    return setTimeout(() => {
      if (Queue.current) {
        Queue.timer = Queue.cron();

        return;
      }
    }, 5000);
  }
}
