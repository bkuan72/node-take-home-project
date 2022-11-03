import { ISchema } from '../../../interfaces/ISchema';
import SysEnv from '../../../modules/SysEnv';
import { OrganizationInputQueryDTO, OrganizationOutputDTO } from './dto/dto.schema';
import { OrganizationSchema } from './schema/OrganizationSchema';

export class OrganizationModel {
  tableName = OrganizationSchema.TableName;
  schema: ISchema = OrganizationSchema;
  requestDTO: any;
  responseDTO: any;
  constructor(altTable?: string) {
    if (altTable) {
      this.tableName = altTable;
    }
    this.requestDTO = OrganizationInputQueryDTO;
    this.responseDTO = OrganizationOutputDTO;
  }
  /**
   * function to create Organization
   * @param dataInOrganization Organization DTO for insert
   */
  create = (dataInOrganization: any, session?: Session, toCamelCase?: boolean): Promise<any> => {
    return new Promise((resolve) => {
      const newOrganization = new this.requestDTO(dataInOrganization, toCamelCase);

      SqlFormatter.formatInsert(
        [{ fieldName: 'site_code', value: this.siteCode },
        { fieldName: 'created_by', value: dataInOrganization._req_action_user_}],
        newOrganization,
        this.tableName,
        this.schema,
        toCamelCase
      ).then((sql) => {
        appDbConnection
          .insert(sql, session)
          .then((id) => {
            newOrganization.id = id;
            resolve(newOrganization);
          })
          .catch(() => {
            resolve(undefined);
          });
      });
    });
  };

  /**
   * Generic function to find data using the Organization.id
   * @param OrganizationId unique Organization.id
   */
  findById = (
    OrganizationId: string,
    session?: Session,
    toCamelCase?: boolean
  ): Promise<any | undefined> => {
    return new Promise((resolve) => {
      let sql =
        SqlFormatter.formatSelect(this.tableName, this.schema) + ' WHERE ';
      sql += SqlStr.format('id = UUID_TO_BIN(?)', [OrganizationId]);
      appDbConnection
        .select(sql, session)
        .then((result) => {
          if (result && result.rows && result.rows.length > 0) {
            const data = SqlFormatter.transposeResultSet(
              this.schema,
              undefined,
              undefined,
              result.rows[0],
              toCamelCase
            );
            const respOrganizationDTO = new this.responseDTO(data, toCamelCase);
            resolve(respOrganizationDTO);
            return;
          }
          // not found Customer with the id
          resolve(undefined);
        })
        .catch((err) => {
          SysLog.error(JSON.stringify(err));
          resolve(undefined);
          return;
        });
    });
  };

  /**
   * Generic function to update Organization by Organization.id
   * @param OrganizationId  unique Organization.id
   * @param OrganizationDTO DTO with properties to be updated
   */
  updateById = async (
    OrganizationId: string,
    OrganizationDTO: any,
    inputSession?: Session,
    toCamelCase?: boolean,
    excludeFields?: string[]
  ): Promise<any | undefined> => {
    return new Promise((resolve) => {
      SqlFormatter.formatUpdate(this.tableName, this.schema, OrganizationDTO, toCamelCase, excludeFields).then(
        (sql) => {
          sql += SqlFormatter.formatWhereAND(
            '',
            { id: OrganizationId },
            this.tableName,
            this.schema
          );
          appDbConnection
            .getSession(inputSession)
            .then((resp) => {
              appDbConnection
                .update(sql, resp.DBSession, false) // do not auto close the session
                .then(() => {
                  SysLog.info('updated Organization: ', {
                    id: OrganizationId,
                    ...OrganizationDTO
                  });
                  this.findById(OrganizationId, resp.DBSession, toCamelCase).then((respOrganizationDTO) => {
                    if (inputSession == undefined)
                    appDbConnection.close(resp.DBSession);
                    resolve(respOrganizationDTO);
                  })
                  .catch(() => {
                    if (inputSession == undefined)
                    appDbConnection.close(resp.DBSession);
                    resolve(undefined);
                  })
                })
                .catch(() => {
                  if (inputSession == undefined)
                  appDbConnection.close(resp.DBSession);
                  resolve(undefined);
                });
            })
            .catch(() => {
              resolve(undefined);
            });
        }
      );
    });
  };

  /**
   * Generic function to query database using properties in the conditions object
   * @param conditions - each property will be AND condition in the SQL
   * @param ignoreExclSelect - do not include properties that are excludeInSelect in the return DTO
   * @param excludeSelectProp - additional properties to be excluded
   */
  find = (
    conditions: any,
    showPassword?: boolean,
    ignoreExclSelect?: boolean,
    excludeSelectProp?: string[],
    session?: Session,
    toCamelCase?: boolean
  ): Promise<any[]> => {
    const respOrganizationDTOArray: any[] = [];
    let sql = SqlFormatter.formatSelect(
      this.tableName,
      this.schema,
      ignoreExclSelect,
      excludeSelectProp
    );
    sql +=
      SqlFormatter.formatWhereAND('', conditions, this.tableName, this.schema) +
      ' AND ';
    sql = SqlFormatter.formatWhereAND(
      sql,
      { site_code: this.siteCode },
      this.tableName,
      this.schema
    );
    return new Promise((resolve) => {
      appDbConnection
        .select(sql, session)
        .then((result) => {
          if (result && result.rows && result.rows.length > 0) {
            result.rows.forEach((rowData: any) => {
              const data = SqlFormatter.transposeResultSet(
                this.schema,
                ignoreExclSelect,
                undefined,
                rowData,
                toCamelCase,
                excludeSelectProp
              );
              const respOrganizationDTO = new this.responseDTO(data, toCamelCase, showPassword);
              respOrganizationDTOArray.push(respOrganizationDTO);
            });
            resolve(respOrganizationDTOArray);
            return;
          } else {
            // not found with the id
            resolve(respOrganizationDTOArray);
          }

        })
        .catch((err) => {
          SysLog.error(JSON.stringify(err));
          resolve(respOrganizationDTOArray);
          return;
        });
    });
  };

  /**
   * Generic function to get all Organization records based on site_code
   */
  getAll = (session?: Session,
            toCamelCase?: boolean): Promise<any[]> => {
    return new Promise((resolve) => {
      const respOrganizationDTOArray: any[] = [];
      let sql = SqlFormatter.formatSelect(this.tableName, this.schema);
      sql += SqlFormatter.formatWhereAND(
        '',
        { site_code: this.siteCode },
        this.tableName,
        this.schema
      );
      appDbConnection
        .select(sql, session)
        .then((result) => {
          if (result && result.rows && result.rows.length > 0) {
            result.rows.forEach((rowData: any) => {
              const data = SqlFormatter.transposeResultSet(
                this.schema,
                undefined,
                undefined,
                rowData,
                toCamelCase
              );
              const respOrganizationDTO = new this.responseDTO(data, toCamelCase);
              respOrganizationDTOArray.push(respOrganizationDTO);
            });
            resolve(respOrganizationDTOArray);
            return;
          } else {
          // not found
          resolve(respOrganizationDTOArray);
          }
        })
        .catch((err) => {
          SysLog.error(JSON.stringify(err));
          resolve(respOrganizationDTOArray);
          return;
        });
    });
  };

  /**
   * Generic function to DELETE record from database using Organization.id
   * @param id Organization.id
   */
  remove = (id: string, session?: Session): Promise<any | undefined> => {
    return new Promise((resolve) => {
      let sql = 'DELETE FROM ' + this.tableName + ' WHERE ';
      sql += SqlStr.format('id = UUID_TO_BIN(?)', [id]);
      appDbConnection
        .update(sql, session)
        .then((_result) => {
          SysLog.info('deleted ' + this.tableName + ' with id: ', id);
          resolve({
            deleted_id: id
          });
        })
        .catch((err) => {
          SysLog.error(JSON.stringify(err));
          resolve(undefined);
          return;
        });
    });
  };

  /**
   * Generic function to update data status = DELETED using Organization.id
   * @param id Organization.id
   */
  deleteById = (id: string, session?: Session, toCamelCase?: boolean): Promise<any[]> => {
    return new Promise((resolve) => {
      const resOrganizationDTOArray: any[] = [];
      let sql = 'UPDATE ' + this.tableName;
      sql += ' SET status = ' + SqlStr.escape('DELETED');
      const isAliveStmt = SqlFormatter.fmtSetIsAliveIfExist(this.schema, false);
      if (isAliveStmt !== undefined) {
        sql += ', ' + isAliveStmt;
      }
      sql += ' WHERE ';
      sql += SqlStr.format('site_code = ?', [this.siteCode]) + ' AND ';
      sql += ' status != ' + SqlStr.escape('DELETED') + ' AND ';
      sql += SqlStr.format('id = UUID_TO_BIN(?)', [id]);


      appDbConnection
        .update(sql, session)
        .then((result) => {
          if (result.rows.length) {
            result.rows.forEach((rowData) => {
              const data = SqlFormatter.transposeResultSet(
                this.schema,
                undefined,
                undefined,
                rowData,
                toCamelCase
              );
              const respOrganizationDTO = new this.responseDTO(data, toCamelCase);
              resOrganizationDTOArray.push(respOrganizationDTO);
            });
            resolve(resOrganizationDTOArray);
            return;
          } else {
            resolve(resOrganizationDTOArray);
          }
        })
        .catch((err) => {
          SysLog.error(JSON.stringify(err));
          resolve(resOrganizationDTOArray);
          return;
        });
    });
  };

  getLastUpdateSince = (
    minWhenUpdatedUsec: any,
    session?: Session,
    toCamelCase?: boolean
  ): Promise<any[] | undefined> => {
    return new Promise((resolve) => {
      const respDTOs: any[] = [];
      let sql =
        SqlFormatter.formatSelect(this.tableName, this.schema) + ' WHERE ';
      sql +=
        SqlStr.format('last_update_usec >= ?', [minWhenUpdatedUsec]) + ' AND ';
      sql = SqlFormatter.formatWhereAND(
        sql,
        { site_code: this.siteCode },
        this.tableName,
        this.schema
      );
      appDbConnection.select(sql, session)
          .then((result) => {
            if (result.rows.length) {
              result.rows.forEach((row) => {
                const data = SqlFormatter.transposeResultSet(
                  this.schema,
                  undefined,
                  undefined,
                  row,
                  toCamelCase
                );
                const respDTO = new this.responseDTO(data, toCamelCase);

                respDTOs.push(respDTO);
              });

              resolve(respDTOs);
              return;
            } else {
            // not found vehicle since
            resolve(respDTOs);
            }

          })
          .catch((err) => {
            SysLog.error(JSON.stringify(err));
            resolve(respDTOs);
            return;
          });
      });
  };
}
