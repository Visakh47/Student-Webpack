export class IndexedDBManager {
    constructor(databaseName, version) {
        this.databaseName = databaseName;
        this.version = version;
        this.db = null;
        this.dbPromise = this.initialize();
    }

    async initialize() {
        if(this.db)
            return Promise.resolve(this.db);

        const request = indexedDB.open(this.databaseName, this.version);
        request.onupgradeneeded = (event) => {
            console.log("Database is Upgrading")
            this.db = event.target.result;
            if(!this.db.objectStoreNames.contains('studentDetails'))
                this.db.createObjectStore("studentDetails", { keyPath: "id" , autoIncrement: true});
          };
        
        const dbPromise = new Promise((resolve,reject) => {
            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log("Connected to DB");
                this.db.onerror = (event) => {
                    console.error(`Database error: ${event.target.error}`);
                }
                resolve();
            }
            
            request.onerror = (event) => {
              console.error("Database Error!");
              reject(event.target.error);
            }; 
        });
        return dbPromise;
    }

    
    async add(item) {
        const transaction = this.db.transaction(['studentDetails'], 'readwrite');
        const studentTable = transaction.objectStore('studentDetails');
        console.log(studentTable);
        const request = studentTable.add(item);
        request.onsuccess = (event) => {
            console.log("Database Insert OP success", event.target.result);
        }
    }

    async edit(item) {
        const transaction = this.db.transaction(['studentDetails'], 'readwrite');
        const studentTable = transaction.objectStore('studentDetails');
        console.log(studentTable);
        const request = studentTable.put(item);
        request.onsuccess = (event) => {
            console.log("Database EDIT OP success", event.target.result);
        }
    }

    async getAll() {
        return new Promise((resolve, reject) => {
           if(!this.db) {
                reject(new Error("Database not initialized"));
                return;
           }
           const transaction = this.db.transaction(['studentDetails'], 'readwrite');
           const studentTable = transaction.objectStore('studentDetails');
           const request = studentTable.getAll();
            request.onsuccess = (event) => { 
                console.log("Retrieved All Data");
                resolve(event.target.result);
            }
            
            request.onerror = (event) => {
                console.log("Failed to retrived all data");
                reject();
            };
        });
    }

    async deleteById(id) {
        const transaction = this.db.transaction(['studentDetails'],'readwrite');
        const studentTable = transaction.objectStore('studentDetails');
        const request = studentTable.delete(id);
        request.addEventListener('success',() => {
            console.log(`Deleted student with ${id}`);
        });
    }

    async getById(id) {
        return new Promise((resolve, reject)  => {
        const transaction = this.db.transaction(['studentDetails'],'readwrite');
        const studentTable = transaction.objectStore('studentDetails');
        const request = studentTable.get(id);

        request.onsuccess  = (event) => {
            var data = event.target.result;
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