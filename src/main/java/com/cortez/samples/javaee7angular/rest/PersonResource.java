package com.cortez.samples.javaee7angular.rest;

import com.cortez.samples.javaee7angular.data.Person;
import com.cortez.samples.javaee7angular.pagination.PaginatedListWrapper;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * @author Roberto Cortez
 */
@Stateless
@Path("persons")
public class PersonResource {
    @PersistenceContext
    private EntityManager entityManager;

    private Integer countPersons() {
        Query query = entityManager.createQuery("SELECT COUNT(p.id) FROM Person p");
        return ((Long) query.getSingleResult()).intValue();
    }

    @SuppressWarnings("unchecked")
    private List<Person> findPersons(int startPosition, int maxResults, String sortFields, String sortDirections) {
        Query query = entityManager.createQuery("SELECT p FROM Person p ORDER BY " + sortFields + " " + sortDirections);
        query.setFirstResult(startPosition);
        query.setMaxResults(maxResults);
        return query.getResultList();
    }

    public PaginatedListWrapper<Person> findPersons(PaginatedListWrapper<Person> wrapper) {
        wrapper.setTotalResults(countPersons());
        int start = (wrapper.getCurrentPage() - 1) * wrapper.getPageSize();
        wrapper.setList(findPersons(start,
                                    wrapper.getPageSize(),
                                    wrapper.getSortFields(),
                                    wrapper.getSortDirections()));
        return wrapper;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public PaginatedListWrapper<Person> listPersons(@DefaultValue("1")
                                                    @QueryParam("page")
                                                    Integer page,
                                                    @DefaultValue("id")
                                                    @QueryParam("sortFields")
                                                    String sortFields,
                                                    @DefaultValue("asc")
                                                    @QueryParam("sortDirections")
                                                    String sortDirections) {
        PaginatedListWrapper<Person> paginatedListWrapper = new PaginatedListWrapper<>();
        paginatedListWrapper.setCurrentPage(page);
        paginatedListWrapper.setSortFields(sortFields);
        paginatedListWrapper.setSortDirections(sortDirections);
        paginatedListWrapper.setPageSize(5);
        return findPersons(paginatedListWrapper);
    }
}
