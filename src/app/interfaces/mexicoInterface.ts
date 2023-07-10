
      export interface index_location_auto_complete{
        colony_id: number;
        municipality_id: number;
        state_id: number;
        country_id: number;
        name: string;
        zip_code: number;
        city: string;
        full_location: string;
      }

      //interfaces Tab2
      export interface index_location_country {
        country_id: number;
        name: string;
      }
      export interface index_location_state {
        country_id: number;
        name: string;
        states: [
            state_id: string,
            country_id: number,
            name: string
        ]
      }
      export interface index_location_city{
        state_id: number;
        country_id: number;
        name: string;
        cities: [
          city: string
        ]
      }
      export interface index_location_Municipality {
        state_id: number;
        country_id: number;
        name: string;
        municipalities: [
          municipality_id: string,
          state_id: number,
          name: string
        ]
      }
      export interface index_location_Colony {
        municipality_id: number;
        state_id: number;
        name: string;
        colonies:[
          colony_id: number,
          municipality_id: number,
          state_id: number ,
          country_id: number ,
          name: string ,
          zip_code: number,
          city: string,
          full_location: string
      
        ]
      }
 


