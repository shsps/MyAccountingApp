export interface ResultData 
{
    affectedRows: number;
    changedRows: number;
    fieldCount: number;
    insertId: number;
    message: string;
    protocol41: boolean;
    serverStatus: number;
    warningCount: number;
}
  
export interface ResponseData 
{
    message: string;
    result: ResultData;
}