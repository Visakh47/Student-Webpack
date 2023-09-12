export class IndexedDBManager {
    private databaseName: string;
    private version: number;
    private db: IDBDatabase | null = null;
    private dbPromise : Promise<IDBDatabase | null>;
    constructor(databaseName: string, version: number) {
        this.databaseName = databaseName;
        this.version = version;
        this.db = null;
        this.dbPromise = this.initialize();
    }

    async initialize() : Promise<IDBDatabase | null> {
        if(this.db)
            return Promise.resolve(this.db);

        const request = indexedDB.open(this.databaseName, this.version);
        request.onupgradeneeded = (event) => {
            console.log("Database is Upgrading")
            this.db = (event.target as IDBRequest).result as IDBDatabase;
            if(!this.db.objectStoreNames.contains('studentDetails'))
                this.db.createObjectStore("studentDetails", { keyPath: "id" , autoIncrement: true});
          };
        
        const dbPromise = new Promise<IDBDatabase>((resolve,reject) => {
            request.onsuccess = (event) => {
                this.db = (event.target as IDBRequest).result as IDBDatabase;
                console.log("Connected to DB");
                this.db.onerror = (event) => {
                    console.error(`Database error: ${(event.target as IDBRequest).error}`);
                }
                resolve(this.db);
            }
            
            request.onerror = (event) => {
              console.error("Database Error!");
              reject((event.target as IDBRequest).error);
            }; 
        });
        return dbPromise;
    }

    
    //Used any because these are DB operations and the item can be of anytype - not stricly student

    async add(item: any) {
        const transaction = this.db!.transaction(['studentDetails'], 'readwrite');
        const studentTable = transaction.objectStore('studentDetails');
        console.log(studentTable);
        const request = studentTable.add(item);
        request.onsuccess = (event) => {
            console.log("Database Insert OP success", (event.target as IDBRequest).result);
        }
    }

    async edit(item: any) {
        const transaction = this.db!.transaction(['studentDetails'], 'readwrite');
        const studentTable = transaction.objectStore('studentDetails');
        console.log(studentTable);
        const request = studentTable.put(item);
        request.onsuccess = (event) => {
            console.log("Database EDIT OP success", (event.target as IDBRequest).result);
        }
    }

    async getAll(): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
           if(!this.db) {
                reject(new Error("Database not initialized"));
                return;
           }
           const transaction = this.db.transaction(['studentDetails'], 'readwrite');
           const studentTable = transaction.objectStore('studentDetails');
           const request = studentTable.getAll();
            request.onsuccess = (event) => { 
                console.log("Retrieved All Data");
                resolve((event.target as IDBRequest).result as any[]);
            }
            
            request.onerror = (event) => {
                console.log("Failed to retrived all data");
                reject();
            };
        });
    }

    async deleteById(id: number): Promise<void> {
        const transaction = this.db!.transaction(['studentDetails'],'readwrite');
        const studentTable = transaction.objectStore('studentDetails');
        const request = studentTable.delete(id);
        request.addEventListener('success',() => {
            console.log(`Deleted student with ${id}`);
        });
    }

    async getById(id: number) : Promise<any> {
        return new Promise((resolve, reject)  => {
        const transaction = this.db!.transaction(['studentDetails'],'readwrite');
        const studentTable = transaction.objectStore('studentDetails');
        const request = studentTable.get(id);

        request.onsuccess  = (event) => {
            const data = (event.target as IDBRequest).result as any;
            console.log(`Received object ${data}`);
            resolve(data);
        }
        request.onerror = (event) => {
            console.error("Error in finding Object");
            reject();
        }
        });
    }

}